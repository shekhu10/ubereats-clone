user entity:

-- id
-- createdAt
-- updatedAt

-- email
-- password
-- role (client / owner / delivery)




Basic setup of user module, with table creation in DB and able to do query in graphql page at
``` localhost:3000/graphql ```



listner -> it is something that is executed when something happens on ur entity.
(entity listner typeorm)

we are using bcript for hashing password
``` npm install bcrypt ```
``` npm i @types/bcrypt --dev-only ```


login with email and password
