CREATE DATABASE homework;

CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(128),
    user_password TEXT,
    user_purse FLOAT DEFAULT 0,
    user_created_att TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE category_expense(
    category_exprense_id SERIAL NOT NULL PRIMARY KEY,
    category_expense_name VARCHAR(64)
);

CREATE TABLE category_income(
    category_income_id SERIAL NOT NULL PRIMARY KEY,
    category_income_name VARCHAR(64)
);

CREATE TABLE income(
    income_id SERIAL NOT NULL PRIMARY KEY,
    income_user_id INT,
    income_category_id INT,
    income_how_much_money FLOAT,
    income_description VARCHAR(1024) DEFAULT 'no description' NOT NULL,
    income_created_att TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (income_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (income_category_id) REFERENCES category_income(category_income_id) ON DELETE CASCADE
);

CREATE TABLE expense(
    expense_id SERIAL NOT NULL PRIMARY KEY,
    expense_user_id INT,
    expense_category_id INT,
    expense_how_much_money FLOAT,
    expense_description VARCHAR(1024) DEFAULT 'no description' NOT NULL,
    expense_created_att TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (expense_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (expense_category_id) REFERENCES category_expense(category_exprense_id) ON DELETE CASCADE
);