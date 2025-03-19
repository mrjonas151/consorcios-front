import { ComponentType } from "react";

interface LoginFormProps {}

interface SignInProps {}

declare namespace ModuleFederation {
    namespace Components {
        const LoginForm: ComponentType<LoginFormProps>;
        const SignIn: ComponentType<SignInProps>;
    }
}

declare module "auth-app/LoginForm" {
    import { ComponentType } from "react";
    const LoginForm: ComponentType<LoginFormProps>;
    export default LoginForm;
}

declare module "auth-app/SignIn" {
    import { ComponentType } from "react";
    const SignIn: ComponentType<SignInProps>;
    export default SignIn;
}

export default ModuleFederation;
