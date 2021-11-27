import * as React from "react";
import { useEffect, useState } from "react";
import HandleForm from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addProduct, editProduct } from "src/redux/form/action";
const HandleFormPage = () => {
  const params = useParams();
  const editID = params.id;
  const l = useSelector((state) => state.listProduct);
  const dispatch = useDispatch();
  var history = useHistory();
  const [submited, setSubmited] = useState(false);
  const initialValues = l.find((item) => item.id === editID);
  const submit = (values) => {
    if (editID === "add") {
        dispatch(
          addProduct({
            ...values,
            id: l[l.length - 1] ? parseInt(l[l.length - 1].id) + 1 : 1,
          })
        );
    } else {
      dispatch(
        editProduct({ ...values, id: editID }, parseInt(editID))
      );
    }
    // print the form values to the console
    setSubmited(true);
  };
  useEffect(() => {
    if (submited === true) history.push("/home");
  });
  return (
    <div>
      <HandleForm onHandleFinish={submit} initialValues={initialValues} />
    </div>
  );
};
export default HandleFormPage;
