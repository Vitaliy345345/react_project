-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TodoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "filter" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createTime" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TodoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "todoId" TEXT NOT NULL,
    CONSTRAINT "TaskList_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "TodoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
