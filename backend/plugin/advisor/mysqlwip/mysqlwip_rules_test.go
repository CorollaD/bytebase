package mysqlwip

import (
	"testing"

	"github.com/bytebase/bytebase/backend/plugin/advisor"
	storepb "github.com/bytebase/bytebase/proto/generated-go/store"
)

func TestMySQLWIPRules(t *testing.T) {
	mysqlwipRules := []advisor.SQLReviewRuleType{
		// advisor.SchemaRuleMySQLEngine enforce the innodb engine.
		advisor.SchemaRuleMySQLEngine,

		// advisor.SchemaRuleTableNaming enforce the table name format.
		advisor.SchemaRuleTableNaming,
		// advisor.SchemaRuleColumnNaming enforce the column name format.
		advisor.SchemaRuleColumnNaming,
		// advisor.SchemaRuleUKNaming enforce the unique key name format.
		advisor.SchemaRuleUKNaming,
		// advisor.SchemaRuleFKNaming enforce the foreign key name format.
		advisor.SchemaRuleFKNaming,
		// advisor.SchemaRuleIDXNaming enforce the index name format.
		advisor.SchemaRuleIDXNaming,
		// advisor.SchemaRuleAutoIncrementColumnNaming enforce the auto_increment column name format.
		advisor.SchemaRuleAutoIncrementColumnNaming,

		// advisor.SchemaRuleStatementNoSelectAll disallow 'SELECT *'.
		advisor.SchemaRuleStatementNoSelectAll,
		// advisor.SchemaRuleStatementRequireWhere require 'WHERE' clause.
		advisor.SchemaRuleStatementRequireWhere,
		// advisor.SchemaRuleStatementNoLeadingWildcardLike disallow leading '%' in LIKE, e.g. LIKE foo = '%x' is not allowed.
		advisor.SchemaRuleStatementNoLeadingWildcardLike,
		// advisor.SchemaRuleStatementDisallowCommit disallow using commit in the issue.
		advisor.SchemaRuleStatementDisallowCommit,
		// advisor.SchemaRuleStatementDisallowLimit disallow the LIMIT clause in INSERT, DELETE and UPDATE statements.
		advisor.SchemaRuleStatementDisallowLimit,

		// advisor.SchemaRuleStatementInsertRowLimit enforce the insert row limit.
		advisor.SchemaRuleStatementInsertRowLimit,

		// advisor.SchemaRuleDropEmptyDatabase enforce the MySQL support check if the database is empty before users drop it.
		advisor.SchemaRuleDropEmptyDatabase,
	}

	for _, rule := range mysqlwipRules {
		advisor.RunSQLReviewRuleTest(t, rule, storepb.Engine_ENGINE_UNSPECIFIED, false /* record */)
	}
}