-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TaskList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isDone" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,
    CONSTRAINT "TaskList_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TodoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TaskList" ("id", "isDone", "title", "todoId") SELECT "id", "isDone", "title", "todoId" FROM "TaskList";
DROP TABLE "TaskList";
ALTER TABLE "new_TaskList" RENAME TO "TaskList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
