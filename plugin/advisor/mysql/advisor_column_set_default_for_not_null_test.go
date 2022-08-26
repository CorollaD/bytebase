package mysql

// Framework code is generated by the generator.

import (
	"testing"

	"github.com/bytebase/bytebase/plugin/advisor"
)

func TestColumnSetDefaultForNotNull(t *testing.T) {
	tests := []advisor.TestCase{
		{
			Statement: `CREATE TABLE book(
				id int PRIMARY KEY DEFAULT 0
			)`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
		{
			Statement: `CREATE TABLE book(
				id int PRIMARY KEY
			)`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    2,
				},
			},
		},
		{
			Statement: `CREATE TABLE book(
				id int NOT NULL
			)`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    2,
				},
			},
		},
		{
			Statement: `CREATE TABLE book(
				id int,
				PRIMARY KEY (id)
			)`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    2,
				},
			},
		},
		{
			Statement: `ALTER TABLE book ADD COLUMN id int PRIMARY KEY`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book ADD COLUMN id int NOT NULL`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book MODIFY COLUMN id int NOT NULL`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book MODIFY COLUMN id int PRIMARY KEY`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book CHANGE COLUMN uid id int PRIMARY KEY`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book CHANGE COLUMN uid id int NOT NULL`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.NotNullColumnWithNullDefault,
					Title:   "column.set-default-for-not-null",
					Content: "Column `book`.`id` is NOT NULL but has NULL default value",
					Line:    1,
				},
			},
		},
		{
			Statement: `ALTER TABLE book 
				CHANGE COLUMN uid id int NOT NULL DEFAULT 0,
				MODIFY COLUMN id int PRIMARY KEY DEFAULT 0,
				ADD COLUMN name varchar(20) NOT NULL DEFAULT ''
				`,
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
	}

	advisor.RunSQLReviewRuleTests(t, tests, &ColumnSetDefaultForNotNullAdvisor{}, &advisor.SQLReviewRule{
		Type:    advisor.SchemaRuleColumnSetDefaultForNotNull,
		Level:   advisor.SchemaRuleLevelWarning,
		Payload: "",
	}, advisor.MockMySQLDatabase)
}
