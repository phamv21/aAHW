require 'sqlite3'
require 'singleton'
require 'active_support/inflector'
class QuestionsDb < SQLite3::Database
    include Singleton
    def initialize
        super('questions.db')
        self.type_translation = true
        self.results_as_hash = true
    end
    
end

class SuperQuestion
    def self.all
        table_name = self.name.tableize
        QuestionsDb.instance.execute("SELECT * FROM #{table_name}")
    end

    def self.find_by_id(i)
        table_name = self.name.tableize
        QuestionsDb.instance.execute(<<-SQL,i)
        SELECT * FROM #{table_name} WHERE id =?
        SQL
    end

    def self.where(options) # options is a hash
        table_name = self.name.tableize
        values = []
        keys = []
        condition = []

        if options.is_a?(Hash)
            keys = options.keys
            values = options.values
            condition = keys.map{|el| "#{el} = ?"}.join(" AND ")
        elsif options.is_a?(String)
            options = SuperQuestion.string_to_command(options)
            keys = options.keys
            values = options.values
            condition = keys.map{|el| "#{el} ?"}.join(" AND ")
        else
            raise "the command is either Hash or String!!!"
        end
        QuestionsDb.instance.execute(<<-SQL,*values)
            SELECT
                *
            FROM
                #{table_name}
            WHERE
                #{condition}
        SQL
    end

    def save
        table_name = self.class.to_s.tableize
        list_with_id = self.instance_variables

        list = list_with_id[1..-1]
        list_pure = list.map{|el| el [1..-1]}
        
        interpolation = ("?,"*list.length)[0...-1]
        interpolation_for_update = list_pure.map{|el| el + " = ?"}

        unless self.id
            puts 'saving new data to database'
            QuestionsDb.instance.execute(<<-SQL,*list.map{|el| instance_variable_get("#{el}")})
                INSERT INTO
                    #{table_name}(#{list_pure.join(',')})
                VALUES
                    (#{interpolation})
        SQL
        self.id = QuestionsDb.instance.last_insert_row_id
        else
            puts "updating #{self}"
            QuestionsDb.instance.execute(<<-SQL,*list.map{|el| instance_variable_get("#{el}")},self.id)
            UPDATE #{table_name}
            SET
            #{interpolation_for_update.join(',')}
            WHERE
            id = ?
        SQL
        end
    end

    def self.string_to_command(str)
        commands = str.split(" AND ")
        commands_hash = (commands.map{|command| [(command.split(" "))[0..1].join(" "), (command.split(" "))[2..-1].join(" ")]})
        commands_hash = commands_hash.to_h
    end


end


class User < SuperQuestion
    attr_accessor :id, :fname, :lname
    def self.all
        data = super
        data.map{|datum| User.new(datum)}
    end
    
    def self.find_by_id(i)
        data = super
        data.map{|datum| Question.new(datum)}
        
    end

    def self.where(options)
        super
    end

    def self.find_by_name(fname,lname)
         data = QuestionsDb.instance.execute(<<-SQL,fname,lname)
         SELECT * 
         FROM users
         WHERE 
            fname = ?
            AND
            lname = ?
         SQL
        data.map{|datum| User.new(datum)}
    end

    def initialize(options) 
        @id = options['id']
        @fname = options['fname']
        @lname = options['lname']
    end
    

    def save
        super
    end

    def authored_quesitons
        Question.find_by_author_id(@id)
    end

    def authored_replies 
        Reply.find_by_user_id(@id)
    end

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(@id)
    end
    
    def liked_questions
        QuestionLike.liked_question_for_user_id(@id)
    end

    def average_karma
        result = QuestionsDb.instance.execute(<<-SQL,@id)
            SELECT 
                id, AVG(num_likers) AS average_kar  
            FROM  
                /* group author id and total like each question - the table is a*/
                (SELECT
                    users.id, likes_for_question.num_likers
                FROM users
                JOIN
                    (SELECT /* author id  - quesiton- id - num -lies*/
                    a.id, a.author_id, b.num_likers
                    FROM questions AS a
                    JOIN
                        /* table of the likers count*/
                        (SELECT 
                            question_id, COUNT(user_id) as num_likers
                        FROM
                            question_likes
                        GROUP BY
                            question_id) AS b ON (a.id = b.question_id)
                        ) AS likes_for_question 
                ON(likes_for_question.author_id = users.id)
                ) AS a
            GROUP BY
                id
            HAVING
                id = ?
        SQL
    end

end

class Question < SuperQuestion
    attr_accessor :id ,:title, :body, :author_id
    def self.all
        data = super
        data.map{|datum| Question.new(datum)}
    end

    def self.find_by_id(i)
        data = super
        data.map{|datum| Question.new(datum)}

    end

    def self.where(options)
        super
    end

    def self.find_by_author_id(author_id)
        data = QuestionsDb.instance.execute(<<-SQL,author_id)
        SELECT * FROM questions WHERE author_id = ?
        SQL
        data.map{|datum| Question.new(datum)}
    end

    def self.most_followed(n) #most n followed quesitons
        QuestionFollow.most_followed_question(n)
    end

    def initialize(options)
        @id = options['id']
        @title = options['title']
        @body = options['body']
        @author_id = options['author_id']
    end

    def save
        super
        
    end

    def author
        result = QuestionsDb.instance.execute("SELECT * FROM users WHERE id = #{author_id}")
        
    end

    def replies
        result = Reply.find_by_question_id(@id)
    end

    def followers
        QuestionFollow.followers_for_question_id(@id)
    end 

    def likers
        QuestionLike.likers_for_question_id(@id)
    end

    def num_likers
        QuestionLike.num_likers_for_question_id(@id)
    end

    def most_liked(n)
        QuestionLike.most_liked_questions(n)
    end


    
end

class Reply < SuperQuestion
    attr_accessor :id, :body, :question_id, :user_id, :reply_parent_id
    def self.all
        data = super
        data.map{|datum| Reply.new(datum)}
    end

    def find_by_id(i)
        data = super
        data.map{|datum| Question.new(datum)}

    end

    def self.find_by_user_id(u_id)
        data = QuestionsDb.instance.execute(<<-SQL,u_id)
            SELECT * FROM replies WHERE user_id = ?
        SQL
        data.map{|datum| Reply.new(datum)}
        
    end
    
    def self.find_by_question_id(q_id)
        data = QuestionsDb.instance.execute(<<-SQL,q_id)
            SELECT * FROM replies WHERE question_id = ?
        SQL
        data.map{|datum| Reply.new(datum)}
    end


    def initialize(options)
        @id = options['id']
        @body = options['body']
        @question_id = options['question_id']
        @user_id = options['user_id']
        @reply_parent_id = options['reply_parent_id']
    end
    
    def save
        super
        
    end
    def author
        result = QuestionsDb.instance.execute("SELECT * FROM users WHERE id = #{user_id}")
        
    end
    
    def question
        result = QuestionsDb.instance.execute("SELECT * FROM questions WHERE id = #{question_id}")
        
    end
    def parent_reply
        result = QuestionsDb.instance.execute("SELECT * FROM replies WHERE id = #{reply_parent_id}")
    end

    def child_replies
        result = QuestionsDb.instance.execute("SELECT * FROM replies WHERE reply_parent_id = #{id}")
    end

    
end

class QuestionFollow
    def self.followers_for_question_id(q_id)
        data = QuestionsDb.instance.execute(<<-SQL,q_id)
            SELECT * 
            FROM users
            JOIN question_follows ON (users.id = question_follows.user_id)
            WHERE question_follows.question_id = ?
        SQL
    end
    def self.followed_questions_for_user_id(u_id)
        data = QuestionsDb.instance.execute(<<-SQL,u_id)
            SELECT * 
            FROM questions
            JOIN question_follows ON (questions.id = question_follows.question_id)
            WHERE question_follows.user_id = ?
        SQL
    end

    def self.most_followed_question(n) #n most follow question
        result = QuestionsDb.instance.execute(<<-SQL,n)
        SELECT 
            a.*, b.follow_times
        FROM
            questions AS a
        JOIN
            (SELECT 
                question_id, COUNT(user_id) AS follow_times
            FROM
                question_follows
            GROUP BY
                question_id
            ORDER BY
                follow_times DESC LIMIT ?) AS b
                ON (a.id = b.question_id)
        SQL
    end

    
end

class QuestionLike
    def self.likers_for_question_id(q_id)
        result = QuestionsDb.instance.execute(<<-SQL,q_id)
            SELECT users.*
            FROM users
            JOIN question_likes ON (users.id = question_likes.user_id)
            WHERE question_likes.question_id = ?
        SQL
    end

    def self.num_likers_for_question_id(q_id)
        result = QuestionsDb.instance.execute(<<-SQL,q_id)
            SELECT COUNT(user_id) AS num_likes
            FROM question_likes
            WHERE question_likes.question_id = ?
        SQL
        
    end

    def self.liked_question_for_user_id(u_id)
        result = QuestionsDb.instance.execute(<<-SQL,u_id)
            SELECT questions.*
            FROM questions
            JOIN question_likes ON (questions.id = question_likes.question_id)
            WHERE question_likes.user_id = ?
        SQL
        
    end

    def self.most_liked_questions(n)
        result = QuestionsDb.instance.execute(<<-SQL,n)
            SELECT
                a.*,b.num_likers
            FROM
                questions AS a
            JOIN
                (SELECT
                    question_id, COUNT(user_id) as num_likers
                FROM
                    question_likes
                GROUP BY 
                    question_id
                ORDER BY
                    num_likers DESC LIMIT ?) AS b ON (a.id = b.question_id)
        SQL
        
    end
    
end

class Test
    def self.join_user_question
        result = QuestionsDb.instance.execute(<<-SQL)
            SELECT 
                id, AVG(num_likers)  
            FROM  
                /* group author id and total like each question - the table is a*/
                (SELECT
                    users.id, likes_for_question.num_likers
                FROM users
                JOIN
                    (SELECT /* author id  - quesiton- id - num -lies*/
                    a.id, a.author_id, b.num_likers
                    FROM questions AS a
                    JOIN
                        /* table of the likers count*/
                        (SELECT 
                            question_id, COUNT(user_id) as num_likers
                        FROM
                            question_likes
                        GROUP BY
                            question_id) AS b ON (a.id = b.question_id)
                        ) AS likes_for_question 
                ON(likes_for_question.author_id = users.id)
                ) AS a
            GROUP BY
                id
            
        SQL
        
    end
end

