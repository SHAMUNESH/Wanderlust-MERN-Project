import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Please enter a valid email").max(30,"Too Long"),
  username: Yup.string().required("Required").min(2,"Too Short").max(30,"Too Long"),
  password: Yup.string().required("Required").max(25,"Too Long"),
});

export default SignUpSchema;