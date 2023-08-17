steps = [
    [
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password VARCHAR(500) NOT NULL,
            years_of_experience INTEGER,
            education VARCHAR(150),
            picture TEXT,
            is_mentor BOOLEAN
        );
        """,
        """
        DROP TABLE account;
        """,
    ],
    [
        """
        CREATE TABLE project (
            id SERIAL PRIMARY KEY NOT NULL,
            project_name VARCHAR(255) NOT NULL,
            project_picture VARCHAR(255) NOT NULL,
            goal TEXT NOT NULL,
            is_completed BOOLEAN NULL,
            owner_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE project;
        """,
    ],
    [
        """
        CREATE TABLE tech_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            stacks TEXT ARRAY
        );
        """,
        """
        DROP TABLE tech_stacks;
        """,
    ],
    [
        """
        CREATE TABLE user_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            account_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE,
            tech_stack_id INTEGER NOT NULL REFERENCES tech_stacks("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE user_stacks;
        """,
    ],
    [
        """
        CREATE TABLE project_stacks (
            id SERIAL PRIMARY KEY NOT NULL,
            project_id INTEGER NOT NULL REFERENCES project("id") ON DELETE CASCADE,
            tech_stacks_id INTEGER NOT NULL REFERENCES tech_stacks("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE project_stacks;
        """,
    ],
    [
        """
        CREATE TABLE attendees (
            id SERIAL PRIMARY KEY NOT NULL,
            project_id INTEGER NOT NULL REFERENCES project("id") ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES account("id") ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE attendees;
        """,
    ]
]
