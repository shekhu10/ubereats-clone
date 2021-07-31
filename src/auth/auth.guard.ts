import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class AuthGuard implements CanActivate {
    // if canactivate is true then request can proceed. it can choose to return true or false based on context.
    canActivate(context: ExecutionContext) {
        // the context that we get in this function is http context
        // we need to convert it to graphql context as both look different.
        // console.log(context);
        const gqlContext = GqlExecutionContext.create(context).getContext();
        // console.log(gqlContext);
        const user = gqlContext['user'];
        // console.log(user);
        if (!user){
            return false;
        }
        return true;
    }
    
}