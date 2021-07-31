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

to create token we need to install ``` npm i jsonwebtoken ``` ``` npm install @types/jsonwebtoken --only-dev ```
jsonwebtoken does not have types for typescript, so we need to install them also. (shortform : jwt)

we need to add secret key... so google random key generator and take 256bit key
anybody can see what is inside jwt token.
jwt token is only used to make sure that nobody touch our token (autheticity is verified using jwt token) and this is why sensitive info must not be shared inside jwt token.
data inside jwt token can be seen easily on jwt.io

there are 2 types of modules
    - static modules -> that does not take any configuration like user module till now.
    - dynamic module -> that take configuratoin like forroot(), it also returns static module in the end.


Creating a function me() which is going to return the current logged in user.
We are also going to pass JWT token in the HTTP header in graphQL to get the current logged in user.
Middle ware is also used to aid this. middle ware can also be used in the form of functions. but as we are using middleware to get the user using token. this means that we have to use userRepository. And for using injectable or repository we have to create middleware as a class.
Now, we have the token of the user. and we need to pass this token to context of apollo server, because anything that is given in context is available to all the resolvers. note: context is send with every request

guard: it is a fn that will choose if you can continue your request.

we can create guards for all different queries. eg-> we can have guards on login, we can have guards on creating user.
