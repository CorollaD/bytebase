import { isEmpty } from "lodash-es";
import { Status } from "nice-grpc-common";
import { markRaw } from "vue";
import { useI18n } from "vue-i18n";
import { BBNotificationStyle } from "@/bbkit/types";
import {
  pushNotification,
  useTabStore,
  useSQLEditorStore,
  useCurrentUserV1,
  useDatabaseV1Store,
} from "@/store";
import { ExecuteConfig, ExecuteOption, SQLResultSetV1 } from "@/types";
import {
  Advice_Status,
  advice_StatusToJSON,
} from "@/types/proto/v1/sql_service";
import { isDatabaseV1Alterable } from "@/utils";
import { parseSQL } from "../components/MonacoEditor/sqlParser";

const useExecuteSQL = () => {
  const { t } = useI18n();
  const currentUser = useCurrentUserV1();
  const databaseStore = useDatabaseV1Store();
  const tabStore = useTabStore();
  const sqlEditorStore = useSQLEditorStore();

  const notify = (
    type: BBNotificationStyle,
    title: string,
    description?: string
  ) => {
    pushNotification({
      module: "bytebase",
      style: type,
      title,
      description,
    });
  };

  const preflight = (query: string) => {
    const tab = tabStore.currentTab;

    if (tab.isExecutingSQL) {
      notify("INFO", t("common.tips"), t("sql-editor.can-not-execute-query"));
      return false;
    }

    const isDisconnected = tabStore.isDisconnected;
    if (isDisconnected) {
      notify("CRITICAL", t("sql-editor.select-connection"));
      return false;
    }

    if (isEmpty(query)) {
      notify("CRITICAL", t("sql-editor.notify-empty-statement"));
      return false;
    }

    tab.isExecutingSQL = true;
    return true;
  };

  const cleanup = () => {
    const tab = tabStore.currentTab;
    tab.isExecutingSQL = false;
  };

  const executeReadonly = async (
    query: string,
    config: ExecuteConfig,
    option?: Partial<ExecuteOption>
  ) => {
    if (!preflight(query)) {
      return cleanup();
    }

    const tab = tabStore.currentTab;
    const { data } = parseSQL(query);

    if (data === undefined) {
      notify("CRITICAL", t("sql-editor.notify-invalid-sql-statement"));
      return cleanup();
    }

    let selectStatement = query;
    if (option?.explain) {
      selectStatement = `EXPLAIN ${selectStatement}`;
    }

    const fail = (result: SQLResultSetV1) => {
      tabStore.updateTab(tab.id, {
        sqlResultSet: {
          error: result.error,
          results: [],
          advices: result.advices,
          status: result.status,
          allowExport: false,
        },
        executeParams: {
          query,
          config,
          option,
        },
      });

      cleanup();
    };

    try {
      const sqlResultSet = await sqlEditorStore.executeQuery({
        statement: selectStatement,
      });
      // TODO(steven): use BBModel instead of notify to show the advice from SQL review.
      let adviceStatus: "SUCCESS" | "ERROR" | "WARNING" = "SUCCESS";
      let adviceNotifyMessage = "";
      for (const advice of sqlResultSet.advices) {
        if (advice.status === Advice_Status.SUCCESS) {
          continue;
        }

        if (advice.status === Advice_Status.ERROR) {
          adviceStatus = "ERROR";
        } else if (adviceStatus !== "ERROR") {
          adviceStatus = "WARNING";
        }

        adviceNotifyMessage += `${advice_StatusToJSON(advice.status)}: ${
          advice.title
        }\n`;
        if (advice.content) {
          adviceNotifyMessage += `${advice.content}\n`;
        }
      }
      if (adviceStatus !== "SUCCESS") {
        const notifyStyle = adviceStatus === "ERROR" ? "CRITICAL" : "WARN";
        notify(
          notifyStyle,
          t("sql-editor.sql-review-result"),
          adviceNotifyMessage
        );
      }

      if (sqlResultSet.error) {
        // The error message should be consistent with the one from the backend.
        if (
          sqlResultSet.error === "Support SELECT sql statement only" &&
          sqlResultSet.status === Status.INVALID_ARGUMENT
        ) {
          const { databaseId } = tab.connection;
          const database = databaseStore.getDatabaseByUID(databaseId);
          // Only show the warning if the database is alterable.
          // AKA, the current user has the permission to alter the database.
          if (isDatabaseV1Alterable(database, currentUser.value)) {
            sqlEditorStore.setSQLEditorState({
              isShowExecutingHint: true,
            });
            return cleanup();
          }
        }
        return fail(sqlResultSet);
      }

      tabStore.updateTab(tab.id, {
        sqlResultSet: markRaw(sqlResultSet),
        executeParams: {
          query,
          config,
          option,
        },
      });
      // Refresh the query history list when the query executed successfully
      // (with or without warnings).
      sqlEditorStore.fetchQueryHistoryList();
      cleanup();
    } catch (error: any) {
      fail(error.response?.data?.message ?? String(error));
    }
  };

  return {
    executeReadonly,
  };
};

export { useExecuteSQL };
