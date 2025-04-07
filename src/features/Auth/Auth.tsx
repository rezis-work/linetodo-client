/* eslint-disable react-refresh/only-export-components */

import { useForm } from "@tanstack/react-form";
import { formOptions } from "@tanstack/react-form/remix";
import type { AnyFieldApi } from "@tanstack/react-form";

import Input from "../../components/Input/Input";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="font-['Roboto'] text-red-500">{field.state.meta.errors.join(", ")}</span>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

type Props = {
  type: "login" | "register";
};

export default (props: Props) => {
  const defaultValues =
    props.type === "login"
      ? {
          usernameOrEmail: "",
          password: "",
        }
      : {
          username: "",
          email: "",
          phone: "",
          password: "",
        };

  const formOpts = formOptions({ defaultValues });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log("Login Data", value);
    },
  });

  return (
    <div className="auth-container w-[343px] h-fit flex flex-col items-center min-[1440px]:w-[669px] min-[1440px]:mt-[102px] min-[1440px]:mx-[0px] min-[1440px]:px-[96px] min-[1440px]:py-[65px] min-[1440px]:bg-[#F6F6F7] min-[1440px]:rounded-[15px]">
      <div className="auth-container__header flex flex-col items-center gap-[32px] mt-[72px] mb-[48px] min-[1440px]:mt-[0px] min-[1440px]:gap-[48px]">
        <div className="w-[79px] h-[79px] bg-[#0500FF73] rounded-[50%]"></div>
        <h2 className="font-['Roboto'] font-medium text-[32px]/[38px] text-[#0059AC]">
          {props.type === "login" ? "Sign in" : "Sign up"}
        </h2>
      </div>
      <form
        className="flex flex-col w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="input-container flex flex-col gap-[16px]">
          {Object.keys(defaultValues).map((key, index) => (
            <form.Field
              key={index}
              name={
                key as
                  | "username"
                  | "usernameOrEmail"
                  | "password"
                  | "email"
                  | "phone"
              }
              validators={{
                onChange: ({ value }) => {
                  const keyName =
                    key === "usernameOrEmail" ? "username of email" : key;
                  return !value ? `${keyName} is required` : undefined;
                },
              }}
              children={(field) => (
                <>
                  <Input
                    type={
                      key as
                        | "username"
                        | "usernameOrEmail"
                        | "password"
                        | "email"
                        | "phone"
                    }
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          ))}
        </div>
        <a href="#"
           className="font-['Roboto'] font-normal text-[14px] text-[#252931] mt-[14px]"
        >Forgot password?</a>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="bg-[#477EE7] rounded-[30px] w-full h-[56px] font-['Roboto'] font-medium text-[16px] text-white mt-[24px]"
              type="submit"
              disabled={!canSubmit}
            >
              {props.type === "login" ? isSubmitting ? "Signin in..." : "Sign in"
              : isSubmitting ? "Signin up..." : "Sign up"}
            </button>
          )}
        />
      </form>
      <p className="font-['Roboto'] text-[#252931] mt-[32px]">
        {props.type === "login" ?
            <>Don't have an account? <a href="/register" className="text-size/[16px] font-medium underline">Sign up</a></>
            : <>Already have an account? <a href="/login" className="text-size/[16px] font-medium underline">Sign in</a></>
        }
      </p>
    </div>
  );
};
