PRAGMA FOREIGN_KEYS = ON;
DROP TABLE IF EXISTS question_likes;
CREATE TABLE question_likes(
   id INTEGER PRIMARY KEY,
   user_id INTEGER NOT NULL,
   question_id INTEGER NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (question_id) REFERENCES questions(id)

);

DROP TABLE IF EXISTS replies;
CREATE TABLE replies(
    id INTEGER PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    question_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    reply_parent_id INTEGER,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reply_parent_id) REFERENCES replies(id)
);

DROP TABLE IF EXISTS question_follows;
CREATE TABLE question_follows(
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

DROP TABLE IF EXISTS questions;
CREATE TABLE questions(
    id INTEGER PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    body VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL,

    FOREIGN KEY (author_id) REFERENCES users(id)
   
);

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL
);

INSERT INTO
    users (fname,lname)
VALUES
    ('Vu','Pham'),
    ('Anh','Tran');

INSERT INTO
    questions (title,body,author_id)
VALUES
    ('How?','can you define how?',(SELECT id FROM users WHERE fname = 'Vu')),
    ('What?','can you define what?',(SELECT id FROM users WHERE fname = 'Vu')),
    ('Where?','can you define where?',(SELECT id FROM users WHERE fname = 'Anh'));

INSERT INTO
    question_follows (question_id,user_id)
VALUES
    ((SELECT id FROM questions WHERE title = 'How?'),(SELECT id FROM users WHERE fname = 'Vu')),
    ((SELECT id FROM questions WHERE title = 'How?'),(SELECT id FROM users WHERE fname = 'Anh')),
    ((SELECT id FROM questions WHERE title = 'What?'),(SELECT id FROM users WHERE fname = 'Vu')),
    ((SELECT id FROM questions WHERE title = 'Where?'),(SELECT id FROM users WHERE fname = 'Vu')),
    ((SELECT id FROM questions WHERE title = 'Where?'),(SELECT id FROM users WHERE fname = 'Anh'));

INSERT INTO
    replies (body,question_id,user_id,reply_parent_id)
VALUES
    ('How is 1',(SELECT id FROM questions WHERE title = 'How?'),(SELECT id FROM users WHERE fname = 'Anh'),NULL),
    ('How is 2',(SELECT id FROM questions WHERE title = 'How?'),(SELECT id FROM users WHERE fname = 'Vu'),1);

INSERT INTO
    question_likes(user_id,question_id)
VALUES
    ((SELECT id FROM users WHERE fname = 'Vu'),(SELECT id FROM questions WHERE title = 'How?')),
    ((SELECT id FROM users WHERE fname = 'Anh'),(SELECT id FROM questions WHERE title = 'How?')),
    ((SELECT id FROM users WHERE fname = 'Vu'),(SELECT id FROM questions WHERE title = 'What?')),
    ((SELECT id FROM users WHERE fname = 'Vu'),(SELECT id FROM questions WHERE title = 'Where?'));
