/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { ExportFormat, exportFormatFromJSON, exportFormatToJSON, exportFormatToNumber } from "./common";

export const protobufPackage = "bytebase.v1";

export interface SearchLogsRequest {
  /**
   * filter is the filter to apply on the list logs request,
   * follow the [ebnf](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) syntax.
   * The field only support in filter:
   * - creator, example:
   *    - creator = "users/{email}"
   * - resource, example:
   *    - resource = "projects/{project resource id}"
   * - level, example:
   *    - level = "INFO"
   *    - level = "ERROR | WARN"
   * - action, example:
   *    - action = "ACTION_MEMBER_CREATE"
   *    - action = "ACTION_MEMBER_CREATE | ACTION_ISSUE_CREATE"
   * - create_time, example:
   *    - create_time <= "2022-01-01T12:00:00.000Z"
   *    - create_time >= "2022-01-01T12:00:00.000Z"
   * For example:
   * List the logs of type 'ACTION_ISSUE_COMMENT_CREATE' in issue/123: 'action="ACTION_ISSUE_COMMENT_CREATE", resource="issue/123"'
   */
  filter: string;
  /**
   * The order by of the log.
   * Only support order by create_time.
   * For example:
   *  - order_by = "create_time asc"
   *  - order_by = "create_time desc"
   */
  orderBy: string;
  /**
   * Not used. The maximum number of logs to return.
   * The service may return fewer than this value.
   * If unspecified, at most 100 log entries will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize: number;
  /**
   * Not used. A page token, received from a previous `SearchLogs` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken: string;
}

export interface SearchLogsResponse {
  /** The list of log entities. */
  logEntities: LogEntity[];
  /**
   * A token to retrieve next page of log entities.
   * Pass this value in the page_token field in the subsequent call to `SearchLogs` method
   * to retrieve the next page of log entities.
   */
  nextPageToken: string;
}

export interface GetLogRequest {
  /**
   * The name of the log to retrieve.
   * Format: logs/{uid}
   */
  name: string;
}

export interface ExportLogsRequest {
  /**
   * Consistent with filter and order by in ListLogs.
   * filter is the filter to apply on the list logs request,
   * follow the [ebnf](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) syntax.
   * The field only support in filter:
   * - creator, example:
   *    - creator = "users/{email}"
   * - resource, example:
   *    - resource = "projects/{project resource id}"
   * - level, example:
   *    - level = "INFO"
   *    - level = "ERROR | WARN"
   * - action, example:
   *    - action = "ACTION_MEMBER_CREATE" | "ACTION_ISSUE_CREATE"
   * - create_time, example:
   *    - create_time <= "2022-01-01T12:00:00.000Z"
   *    - create_time >= "2022-01-01T12:00:00.000Z"
   * For example:
   * List the logs of type 'ACTION_ISSUE_COMMENT_CREATE' in issue/123: 'action="ACTION_ISSUE_COMMENT_CREATE", resource="issue/123"'
   */
  filter: string;
  /**
   * The order by of the log.
   * Only support order by create_time.
   * For example:
   *  - order_by = "create_time asc"
   *  - order_by = "create_time desc"
   */
  orderBy: string;
  /** The export format. */
  format: ExportFormat;
}

export interface ExportLogsResponse {
  content: Uint8Array;
}

export interface LogEntity {
  /**
   * The name of the log.
   * Format: logs/{uid}
   */
  name: string;
  /**
   * The creator of the log entity.
   * Format: users/{email}
   */
  creator: string;
  createTime: Date | undefined;
  updateTime: Date | undefined;
  action: LogEntity_Action;
  level: LogEntity_Level;
  /**
   * The name of the resource associated with this log entity. For example, the resource user associated with log entity type of "ACTION_MEMBER_CREATE".
   * Format:
   * For ACTION_MEMBER_*: users/{email}
   * For ACTION_ISSUE_*: issues/{issue uid}
   * For ACTION_PIPELINE_*: pipelines/{pipeline uid}
   * For ACTION_PROJECT_*: projects/{project resource id}
   * For ACTION_DATABASE_*: instances/{instance resource id}
   */
  resource: string;
  /**
   * The payload of the log entity.
   * TODO: use oneof
   */
  payload: string;
  comment: string;
}

export enum LogEntity_Action {
  /** ACTION_UNSPECIFIED - In worksapce resource only. */
  ACTION_UNSPECIFIED = "ACTION_UNSPECIFIED",
  /**
   * ACTION_MEMBER_CREATE - Member related activity types.
   * Enum value 1 - 20
   *
   * ACTION_MEMBER_CREATE is the type for creating a new member.
   */
  ACTION_MEMBER_CREATE = "ACTION_MEMBER_CREATE",
  /** ACTION_MEMBER_ROLE_UPDATE - ACTION_MEMBER_ROLE_UPDATE is the type for updating a member's role. */
  ACTION_MEMBER_ROLE_UPDATE = "ACTION_MEMBER_ROLE_UPDATE",
  /** ACTION_MEMBER_ACTIVATE - ACTION_MEMBER_ACTIVATE_UPDATE is the type for activating members. */
  ACTION_MEMBER_ACTIVATE = "ACTION_MEMBER_ACTIVATE",
  /** ACTION_MEMBER_DEACTIVE - ACTION_MEMBER_DEACTIVE is the type for deactiving members. */
  ACTION_MEMBER_DEACTIVE = "ACTION_MEMBER_DEACTIVE",
  /**
   * ACTION_ISSUE_CREATE - Issue related activity types.
   * Enum value 21 - 40
   *
   * ACTION_ISSUE_CREATE is the type for creating a new issue.
   */
  ACTION_ISSUE_CREATE = "ACTION_ISSUE_CREATE",
  /** ACTION_ISSUE_COMMENT_CREATE - ACTION_ISSUE_COMMENT_CREATE is the type for creating a new comment on an issue. */
  ACTION_ISSUE_COMMENT_CREATE = "ACTION_ISSUE_COMMENT_CREATE",
  /** ACTION_ISSUE_FIELD_UPDATE - ACTION_ISSUE_FIELD_UPDATE is the type for updating an issue's field. */
  ACTION_ISSUE_FIELD_UPDATE = "ACTION_ISSUE_FIELD_UPDATE",
  /** ACTION_ISSUE_STATUS_UPDATE - ACTION_ISSUE_STATUS_UPDATE is the type for updating an issue's status. */
  ACTION_ISSUE_STATUS_UPDATE = "ACTION_ISSUE_STATUS_UPDATE",
  /** ACTION_ISSUE_APPROVAL_NOTIFY - ACTION_ISSUE_APPROVAL_NOTIFY is the type for notifying issue approval. */
  ACTION_ISSUE_APPROVAL_NOTIFY = "ACTION_ISSUE_APPROVAL_NOTIFY",
  /** ACTION_PIPELINE_STAGE_STATUS_UPDATE - ACTION_PIPELINE_STAGE_STATUS_UPDATE represents the pipeline stage status change, including BEGIN, END for now. */
  ACTION_PIPELINE_STAGE_STATUS_UPDATE = "ACTION_PIPELINE_STAGE_STATUS_UPDATE",
  /** ACTION_PIPELINE_TASK_STATUS_UPDATE - ACTION_PIPELINE_TASK_STATUS_UPDATE represents the pipeline task status change, including PENDING, PENDING_APPROVAL, RUNNING, SUCCESS, FAILURE, CANCELED for now. */
  ACTION_PIPELINE_TASK_STATUS_UPDATE = "ACTION_PIPELINE_TASK_STATUS_UPDATE",
  /** ACTION_PIPELINE_TASK_STATEMENT_UPDATE - ACTION_PIPELINE_TASK_STATEMENT_UPDATE represents the manual update of the task statement. */
  ACTION_PIPELINE_TASK_STATEMENT_UPDATE = "ACTION_PIPELINE_TASK_STATEMENT_UPDATE",
  /** ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE - ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE represents the manual update of the task earliest allowed time. */
  ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE = "ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE",
  /** ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE - ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE represents the pipeline task run status change, including PENDING, RUNNING, SUCCESS, FAILURE, CANCELED for now. */
  ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE = "ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE",
  /** ACTION_PIPELINE_TASK_PRIOR_BACKUP - ACTION_PIPELINE_TASK_PRIOR_BACKUP represents the pipeline task prior backup activity. */
  ACTION_PIPELINE_TASK_PRIOR_BACKUP = "ACTION_PIPELINE_TASK_PRIOR_BACKUP",
  /**
   * ACTION_PROJECT_REPOSITORY_PUSH - Project related activity types.
   * Enum value 41 - 60
   *
   * ACTION_PROJECT_REPOSITORY_PUSH represents Bytebase receiving a push event from the project repository.
   */
  ACTION_PROJECT_REPOSITORY_PUSH = "ACTION_PROJECT_REPOSITORY_PUSH",
  /** ACTION_PROJECT_MEMBER_CREATE - ACTION_PROJECT_MEMBER_CREATE represents adding a member to the project. */
  ACTION_PROJECT_MEMBER_CREATE = "ACTION_PROJECT_MEMBER_CREATE",
  /** ACTION_PROJECT_MEMBER_DELETE - ACTION_PROJECT_MEMBER_DELETE represents removing a member from the project. */
  ACTION_PROJECT_MEMBER_DELETE = "ACTION_PROJECT_MEMBER_DELETE",
  /** ACTION_PROJECT_DATABASE_TRANSFER - ACTION_PROJECT_DATABASE_TRANSFER represents transfering the database from one project to another. */
  ACTION_PROJECT_DATABASE_TRANSFER = "ACTION_PROJECT_DATABASE_TRANSFER",
  /**
   * ACTION_DATABASE_SQL_EDITOR_QUERY - Database related activity types.
   * Enum value 61 - 80
   *
   * ACTION_DATABASE_SQL_EDITOR_QUERY is the type for SQL editor query.
   */
  ACTION_DATABASE_SQL_EDITOR_QUERY = "ACTION_DATABASE_SQL_EDITOR_QUERY",
  /** ACTION_DATABASE_SQL_EXPORT - ACTION_DATABASE_SQL_EXPORT is the type for exporting SQL. */
  ACTION_DATABASE_SQL_EXPORT = "ACTION_DATABASE_SQL_EXPORT",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function logEntity_ActionFromJSON(object: any): LogEntity_Action {
  switch (object) {
    case 0:
    case "ACTION_UNSPECIFIED":
      return LogEntity_Action.ACTION_UNSPECIFIED;
    case 1:
    case "ACTION_MEMBER_CREATE":
      return LogEntity_Action.ACTION_MEMBER_CREATE;
    case 2:
    case "ACTION_MEMBER_ROLE_UPDATE":
      return LogEntity_Action.ACTION_MEMBER_ROLE_UPDATE;
    case 3:
    case "ACTION_MEMBER_ACTIVATE":
      return LogEntity_Action.ACTION_MEMBER_ACTIVATE;
    case 4:
    case "ACTION_MEMBER_DEACTIVE":
      return LogEntity_Action.ACTION_MEMBER_DEACTIVE;
    case 21:
    case "ACTION_ISSUE_CREATE":
      return LogEntity_Action.ACTION_ISSUE_CREATE;
    case 22:
    case "ACTION_ISSUE_COMMENT_CREATE":
      return LogEntity_Action.ACTION_ISSUE_COMMENT_CREATE;
    case 23:
    case "ACTION_ISSUE_FIELD_UPDATE":
      return LogEntity_Action.ACTION_ISSUE_FIELD_UPDATE;
    case 24:
    case "ACTION_ISSUE_STATUS_UPDATE":
      return LogEntity_Action.ACTION_ISSUE_STATUS_UPDATE;
    case 25:
    case "ACTION_ISSUE_APPROVAL_NOTIFY":
      return LogEntity_Action.ACTION_ISSUE_APPROVAL_NOTIFY;
    case 31:
    case "ACTION_PIPELINE_STAGE_STATUS_UPDATE":
      return LogEntity_Action.ACTION_PIPELINE_STAGE_STATUS_UPDATE;
    case 32:
    case "ACTION_PIPELINE_TASK_STATUS_UPDATE":
      return LogEntity_Action.ACTION_PIPELINE_TASK_STATUS_UPDATE;
    case 34:
    case "ACTION_PIPELINE_TASK_STATEMENT_UPDATE":
      return LogEntity_Action.ACTION_PIPELINE_TASK_STATEMENT_UPDATE;
    case 35:
    case "ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE":
      return LogEntity_Action.ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE;
    case 36:
    case "ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE":
      return LogEntity_Action.ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE;
    case 37:
    case "ACTION_PIPELINE_TASK_PRIOR_BACKUP":
      return LogEntity_Action.ACTION_PIPELINE_TASK_PRIOR_BACKUP;
    case 41:
    case "ACTION_PROJECT_REPOSITORY_PUSH":
      return LogEntity_Action.ACTION_PROJECT_REPOSITORY_PUSH;
    case 42:
    case "ACTION_PROJECT_MEMBER_CREATE":
      return LogEntity_Action.ACTION_PROJECT_MEMBER_CREATE;
    case 43:
    case "ACTION_PROJECT_MEMBER_DELETE":
      return LogEntity_Action.ACTION_PROJECT_MEMBER_DELETE;
    case 45:
    case "ACTION_PROJECT_DATABASE_TRANSFER":
      return LogEntity_Action.ACTION_PROJECT_DATABASE_TRANSFER;
    case 61:
    case "ACTION_DATABASE_SQL_EDITOR_QUERY":
      return LogEntity_Action.ACTION_DATABASE_SQL_EDITOR_QUERY;
    case 62:
    case "ACTION_DATABASE_SQL_EXPORT":
      return LogEntity_Action.ACTION_DATABASE_SQL_EXPORT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogEntity_Action.UNRECOGNIZED;
  }
}

export function logEntity_ActionToJSON(object: LogEntity_Action): string {
  switch (object) {
    case LogEntity_Action.ACTION_UNSPECIFIED:
      return "ACTION_UNSPECIFIED";
    case LogEntity_Action.ACTION_MEMBER_CREATE:
      return "ACTION_MEMBER_CREATE";
    case LogEntity_Action.ACTION_MEMBER_ROLE_UPDATE:
      return "ACTION_MEMBER_ROLE_UPDATE";
    case LogEntity_Action.ACTION_MEMBER_ACTIVATE:
      return "ACTION_MEMBER_ACTIVATE";
    case LogEntity_Action.ACTION_MEMBER_DEACTIVE:
      return "ACTION_MEMBER_DEACTIVE";
    case LogEntity_Action.ACTION_ISSUE_CREATE:
      return "ACTION_ISSUE_CREATE";
    case LogEntity_Action.ACTION_ISSUE_COMMENT_CREATE:
      return "ACTION_ISSUE_COMMENT_CREATE";
    case LogEntity_Action.ACTION_ISSUE_FIELD_UPDATE:
      return "ACTION_ISSUE_FIELD_UPDATE";
    case LogEntity_Action.ACTION_ISSUE_STATUS_UPDATE:
      return "ACTION_ISSUE_STATUS_UPDATE";
    case LogEntity_Action.ACTION_ISSUE_APPROVAL_NOTIFY:
      return "ACTION_ISSUE_APPROVAL_NOTIFY";
    case LogEntity_Action.ACTION_PIPELINE_STAGE_STATUS_UPDATE:
      return "ACTION_PIPELINE_STAGE_STATUS_UPDATE";
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATUS_UPDATE:
      return "ACTION_PIPELINE_TASK_STATUS_UPDATE";
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATEMENT_UPDATE:
      return "ACTION_PIPELINE_TASK_STATEMENT_UPDATE";
    case LogEntity_Action.ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE:
      return "ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE";
    case LogEntity_Action.ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE:
      return "ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE";
    case LogEntity_Action.ACTION_PIPELINE_TASK_PRIOR_BACKUP:
      return "ACTION_PIPELINE_TASK_PRIOR_BACKUP";
    case LogEntity_Action.ACTION_PROJECT_REPOSITORY_PUSH:
      return "ACTION_PROJECT_REPOSITORY_PUSH";
    case LogEntity_Action.ACTION_PROJECT_MEMBER_CREATE:
      return "ACTION_PROJECT_MEMBER_CREATE";
    case LogEntity_Action.ACTION_PROJECT_MEMBER_DELETE:
      return "ACTION_PROJECT_MEMBER_DELETE";
    case LogEntity_Action.ACTION_PROJECT_DATABASE_TRANSFER:
      return "ACTION_PROJECT_DATABASE_TRANSFER";
    case LogEntity_Action.ACTION_DATABASE_SQL_EDITOR_QUERY:
      return "ACTION_DATABASE_SQL_EDITOR_QUERY";
    case LogEntity_Action.ACTION_DATABASE_SQL_EXPORT:
      return "ACTION_DATABASE_SQL_EXPORT";
    case LogEntity_Action.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function logEntity_ActionToNumber(object: LogEntity_Action): number {
  switch (object) {
    case LogEntity_Action.ACTION_UNSPECIFIED:
      return 0;
    case LogEntity_Action.ACTION_MEMBER_CREATE:
      return 1;
    case LogEntity_Action.ACTION_MEMBER_ROLE_UPDATE:
      return 2;
    case LogEntity_Action.ACTION_MEMBER_ACTIVATE:
      return 3;
    case LogEntity_Action.ACTION_MEMBER_DEACTIVE:
      return 4;
    case LogEntity_Action.ACTION_ISSUE_CREATE:
      return 21;
    case LogEntity_Action.ACTION_ISSUE_COMMENT_CREATE:
      return 22;
    case LogEntity_Action.ACTION_ISSUE_FIELD_UPDATE:
      return 23;
    case LogEntity_Action.ACTION_ISSUE_STATUS_UPDATE:
      return 24;
    case LogEntity_Action.ACTION_ISSUE_APPROVAL_NOTIFY:
      return 25;
    case LogEntity_Action.ACTION_PIPELINE_STAGE_STATUS_UPDATE:
      return 31;
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATUS_UPDATE:
      return 32;
    case LogEntity_Action.ACTION_PIPELINE_TASK_STATEMENT_UPDATE:
      return 34;
    case LogEntity_Action.ACTION_PIPELINE_TASK_EARLIEST_ALLOWED_TIME_UPDATE:
      return 35;
    case LogEntity_Action.ACTION_PIPELINE_TASK_RUN_STATUS_UPDATE:
      return 36;
    case LogEntity_Action.ACTION_PIPELINE_TASK_PRIOR_BACKUP:
      return 37;
    case LogEntity_Action.ACTION_PROJECT_REPOSITORY_PUSH:
      return 41;
    case LogEntity_Action.ACTION_PROJECT_MEMBER_CREATE:
      return 42;
    case LogEntity_Action.ACTION_PROJECT_MEMBER_DELETE:
      return 43;
    case LogEntity_Action.ACTION_PROJECT_DATABASE_TRANSFER:
      return 45;
    case LogEntity_Action.ACTION_DATABASE_SQL_EDITOR_QUERY:
      return 61;
    case LogEntity_Action.ACTION_DATABASE_SQL_EXPORT:
      return 62;
    case LogEntity_Action.UNRECOGNIZED:
    default:
      return -1;
  }
}

export enum LogEntity_Level {
  LEVEL_UNSPECIFIED = "LEVEL_UNSPECIFIED",
  /** LEVEL_INFO - LEVEL_INFO is the type for information. */
  LEVEL_INFO = "LEVEL_INFO",
  /** LEVEL_WARNING - LEVEL_WARNING is the type for warning. */
  LEVEL_WARNING = "LEVEL_WARNING",
  /** LEVEL_ERROR - LEVEL_ERROR is the type for error. */
  LEVEL_ERROR = "LEVEL_ERROR",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function logEntity_LevelFromJSON(object: any): LogEntity_Level {
  switch (object) {
    case 0:
    case "LEVEL_UNSPECIFIED":
      return LogEntity_Level.LEVEL_UNSPECIFIED;
    case 1:
    case "LEVEL_INFO":
      return LogEntity_Level.LEVEL_INFO;
    case 2:
    case "LEVEL_WARNING":
      return LogEntity_Level.LEVEL_WARNING;
    case 3:
    case "LEVEL_ERROR":
      return LogEntity_Level.LEVEL_ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LogEntity_Level.UNRECOGNIZED;
  }
}

export function logEntity_LevelToJSON(object: LogEntity_Level): string {
  switch (object) {
    case LogEntity_Level.LEVEL_UNSPECIFIED:
      return "LEVEL_UNSPECIFIED";
    case LogEntity_Level.LEVEL_INFO:
      return "LEVEL_INFO";
    case LogEntity_Level.LEVEL_WARNING:
      return "LEVEL_WARNING";
    case LogEntity_Level.LEVEL_ERROR:
      return "LEVEL_ERROR";
    case LogEntity_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export function logEntity_LevelToNumber(object: LogEntity_Level): number {
  switch (object) {
    case LogEntity_Level.LEVEL_UNSPECIFIED:
      return 0;
    case LogEntity_Level.LEVEL_INFO:
      return 1;
    case LogEntity_Level.LEVEL_WARNING:
      return 2;
    case LogEntity_Level.LEVEL_ERROR:
      return 3;
    case LogEntity_Level.UNRECOGNIZED:
    default:
      return -1;
  }
}

function createBaseSearchLogsRequest(): SearchLogsRequest {
  return { filter: "", orderBy: "", pageSize: 0, pageToken: "" };
}

export const SearchLogsRequest = {
  encode(message: SearchLogsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== "") {
      writer.uint32(10).string(message.filter);
    }
    if (message.orderBy !== "") {
      writer.uint32(18).string(message.orderBy);
    }
    if (message.pageSize !== 0) {
      writer.uint32(24).int32(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(34).string(message.pageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchLogsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchLogsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orderBy = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchLogsRequest {
    return {
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      orderBy: isSet(object.orderBy) ? globalThis.String(object.orderBy) : "",
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      pageToken: isSet(object.pageToken) ? globalThis.String(object.pageToken) : "",
    };
  },

  toJSON(message: SearchLogsRequest): unknown {
    const obj: any = {};
    if (message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.orderBy !== "") {
      obj.orderBy = message.orderBy;
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.pageToken !== "") {
      obj.pageToken = message.pageToken;
    }
    return obj;
  },

  create(base?: DeepPartial<SearchLogsRequest>): SearchLogsRequest {
    return SearchLogsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchLogsRequest>): SearchLogsRequest {
    const message = createBaseSearchLogsRequest();
    message.filter = object.filter ?? "";
    message.orderBy = object.orderBy ?? "";
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

function createBaseSearchLogsResponse(): SearchLogsResponse {
  return { logEntities: [], nextPageToken: "" };
}

export const SearchLogsResponse = {
  encode(message: SearchLogsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.logEntities) {
      LogEntity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(18).string(message.nextPageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchLogsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchLogsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.logEntities.push(LogEntity.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nextPageToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchLogsResponse {
    return {
      logEntities: globalThis.Array.isArray(object?.logEntities)
        ? object.logEntities.map((e: any) => LogEntity.fromJSON(e))
        : [],
      nextPageToken: isSet(object.nextPageToken) ? globalThis.String(object.nextPageToken) : "",
    };
  },

  toJSON(message: SearchLogsResponse): unknown {
    const obj: any = {};
    if (message.logEntities?.length) {
      obj.logEntities = message.logEntities.map((e) => LogEntity.toJSON(e));
    }
    if (message.nextPageToken !== "") {
      obj.nextPageToken = message.nextPageToken;
    }
    return obj;
  },

  create(base?: DeepPartial<SearchLogsResponse>): SearchLogsResponse {
    return SearchLogsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchLogsResponse>): SearchLogsResponse {
    const message = createBaseSearchLogsResponse();
    message.logEntities = object.logEntities?.map((e) => LogEntity.fromPartial(e)) || [];
    message.nextPageToken = object.nextPageToken ?? "";
    return message;
  },
};

function createBaseGetLogRequest(): GetLogRequest {
  return { name: "" };
}

export const GetLogRequest = {
  encode(message: GetLogRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLogRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLogRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLogRequest {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetLogRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<GetLogRequest>): GetLogRequest {
    return GetLogRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetLogRequest>): GetLogRequest {
    const message = createBaseGetLogRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseExportLogsRequest(): ExportLogsRequest {
  return { filter: "", orderBy: "", format: ExportFormat.FORMAT_UNSPECIFIED };
}

export const ExportLogsRequest = {
  encode(message: ExportLogsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== "") {
      writer.uint32(10).string(message.filter);
    }
    if (message.orderBy !== "") {
      writer.uint32(18).string(message.orderBy);
    }
    if (message.format !== ExportFormat.FORMAT_UNSPECIFIED) {
      writer.uint32(40).int32(exportFormatToNumber(message.format));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportLogsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportLogsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.filter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orderBy = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.format = exportFormatFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportLogsRequest {
    return {
      filter: isSet(object.filter) ? globalThis.String(object.filter) : "",
      orderBy: isSet(object.orderBy) ? globalThis.String(object.orderBy) : "",
      format: isSet(object.format) ? exportFormatFromJSON(object.format) : ExportFormat.FORMAT_UNSPECIFIED,
    };
  },

  toJSON(message: ExportLogsRequest): unknown {
    const obj: any = {};
    if (message.filter !== "") {
      obj.filter = message.filter;
    }
    if (message.orderBy !== "") {
      obj.orderBy = message.orderBy;
    }
    if (message.format !== ExportFormat.FORMAT_UNSPECIFIED) {
      obj.format = exportFormatToJSON(message.format);
    }
    return obj;
  },

  create(base?: DeepPartial<ExportLogsRequest>): ExportLogsRequest {
    return ExportLogsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ExportLogsRequest>): ExportLogsRequest {
    const message = createBaseExportLogsRequest();
    message.filter = object.filter ?? "";
    message.orderBy = object.orderBy ?? "";
    message.format = object.format ?? ExportFormat.FORMAT_UNSPECIFIED;
    return message;
  },
};

function createBaseExportLogsResponse(): ExportLogsResponse {
  return { content: new Uint8Array(0) };
}

export const ExportLogsResponse = {
  encode(message: ExportLogsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content.length !== 0) {
      writer.uint32(10).bytes(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExportLogsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExportLogsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.content = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExportLogsResponse {
    return { content: isSet(object.content) ? bytesFromBase64(object.content) : new Uint8Array(0) };
  },

  toJSON(message: ExportLogsResponse): unknown {
    const obj: any = {};
    if (message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    return obj;
  },

  create(base?: DeepPartial<ExportLogsResponse>): ExportLogsResponse {
    return ExportLogsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ExportLogsResponse>): ExportLogsResponse {
    const message = createBaseExportLogsResponse();
    message.content = object.content ?? new Uint8Array(0);
    return message;
  },
};

function createBaseLogEntity(): LogEntity {
  return {
    name: "",
    creator: "",
    createTime: undefined,
    updateTime: undefined,
    action: LogEntity_Action.ACTION_UNSPECIFIED,
    level: LogEntity_Level.LEVEL_UNSPECIFIED,
    resource: "",
    payload: "",
    comment: "",
  };
}

export const LogEntity = {
  encode(message: LogEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.createTime !== undefined) {
      Timestamp.encode(toTimestamp(message.createTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.updateTime !== undefined) {
      Timestamp.encode(toTimestamp(message.updateTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.action !== LogEntity_Action.ACTION_UNSPECIFIED) {
      writer.uint32(40).int32(logEntity_ActionToNumber(message.action));
    }
    if (message.level !== LogEntity_Level.LEVEL_UNSPECIFIED) {
      writer.uint32(48).int32(logEntity_LevelToNumber(message.level));
    }
    if (message.resource !== "") {
      writer.uint32(58).string(message.resource);
    }
    if (message.payload !== "") {
      writer.uint32(66).string(message.payload);
    }
    if (message.comment !== "") {
      writer.uint32(74).string(message.comment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogEntity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.updateTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.action = logEntity_ActionFromJSON(reader.int32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.level = logEntity_LevelFromJSON(reader.int32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.resource = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.payload = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.comment = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LogEntity {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      createTime: isSet(object.createTime) ? fromJsonTimestamp(object.createTime) : undefined,
      updateTime: isSet(object.updateTime) ? fromJsonTimestamp(object.updateTime) : undefined,
      action: isSet(object.action) ? logEntity_ActionFromJSON(object.action) : LogEntity_Action.ACTION_UNSPECIFIED,
      level: isSet(object.level) ? logEntity_LevelFromJSON(object.level) : LogEntity_Level.LEVEL_UNSPECIFIED,
      resource: isSet(object.resource) ? globalThis.String(object.resource) : "",
      payload: isSet(object.payload) ? globalThis.String(object.payload) : "",
      comment: isSet(object.comment) ? globalThis.String(object.comment) : "",
    };
  },

  toJSON(message: LogEntity): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.createTime !== undefined) {
      obj.createTime = message.createTime.toISOString();
    }
    if (message.updateTime !== undefined) {
      obj.updateTime = message.updateTime.toISOString();
    }
    if (message.action !== LogEntity_Action.ACTION_UNSPECIFIED) {
      obj.action = logEntity_ActionToJSON(message.action);
    }
    if (message.level !== LogEntity_Level.LEVEL_UNSPECIFIED) {
      obj.level = logEntity_LevelToJSON(message.level);
    }
    if (message.resource !== "") {
      obj.resource = message.resource;
    }
    if (message.payload !== "") {
      obj.payload = message.payload;
    }
    if (message.comment !== "") {
      obj.comment = message.comment;
    }
    return obj;
  },

  create(base?: DeepPartial<LogEntity>): LogEntity {
    return LogEntity.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LogEntity>): LogEntity {
    const message = createBaseLogEntity();
    message.name = object.name ?? "";
    message.creator = object.creator ?? "";
    message.createTime = object.createTime ?? undefined;
    message.updateTime = object.updateTime ?? undefined;
    message.action = object.action ?? LogEntity_Action.ACTION_UNSPECIFIED;
    message.level = object.level ?? LogEntity_Level.LEVEL_UNSPECIFIED;
    message.resource = object.resource ?? "";
    message.payload = object.payload ?? "";
    message.comment = object.comment ?? "";
    return message;
  },
};

export type LoggingServiceDefinition = typeof LoggingServiceDefinition;
export const LoggingServiceDefinition = {
  name: "LoggingService",
  fullName: "bytebase.v1.LoggingService",
  methods: {
    searchLogs: {
      name: "SearchLogs",
      requestType: SearchLogsRequest,
      requestStream: false,
      responseType: SearchLogsResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([17, 18, 15, 47, 118, 49, 47, 108, 111, 103, 115, 58, 115, 101, 97, 114, 99, 104]),
          ],
        },
      },
    },
    getLog: {
      name: "GetLog",
      requestType: GetLogRequest,
      requestStream: false,
      responseType: LogEntity,
      responseStream: false,
      options: {
        _unknownFields: {
          8410: [new Uint8Array([4, 110, 97, 109, 101])],
          578365826: [
            new Uint8Array([19, 18, 17, 47, 118, 49, 47, 123, 110, 97, 109, 101, 61, 108, 111, 103, 115, 47, 42, 125]),
          ],
        },
      },
    },
    exportLogs: {
      name: "ExportLogs",
      requestType: ExportLogsRequest,
      requestStream: false,
      responseType: ExportLogsResponse,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              20,
              58,
              1,
              42,
              34,
              15,
              47,
              118,
              49,
              47,
              108,
              111,
              103,
              115,
              58,
              101,
              120,
              112,
              111,
              114,
              116,
            ]),
          ],
        },
      },
    },
  },
} as const;

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
