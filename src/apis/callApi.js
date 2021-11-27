import axios from "axios";
import {
  URL_LOGIN_WITH_PASS,
  URL_SIGNUP,
  URL_GET_USER_INFO,
  URL_PROJECT,
  URL_UPLOAD,
  URL_VERIFY_EMAIL,
  URL_RESET_PASS,
  URL_FORGOT_PASS,
  URL_TIMEZONE,
  URL_VERIFY_RESET_MAIL
} from "./ip_config";
import { setHeaderByToken } from "./setHeader";

export const apiLoginPass = async (header, username, password) => {
  const result = await axios
    .post(URL_LOGIN_WITH_PASS, {
      email: username,
      password,
    },{ headers: { ...header } })
  return result.data
};

export const apiSignUp = async (header, body) => {
  const result = await axios
    .post(URL_SIGNUP,
      { ...body },
      { headers: { ...header } }
    )

  return result.data
};

export const apiForgotPass = async (body) => {
  const result = await axios
    .post(URL_FORGOT_PASS,
      { ...body })
  return result.data
}

export const apiResetPass = async (body) => {
  const result = await axios
    .post(URL_RESET_PASS,
      { ...body })
  return result.data
}

export const apiGetUserInfo = async () => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(URL_GET_USER_INFO,
      { headers: { ...headerToken } })
  return result.data
};

export const apiAddProject = async (body) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .post(URL_PROJECT,
      { ...body },
      { headers: { ...headerToken } })
  return result.data
}

export const apiUpdateProject = async (id, body) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .put(`${URL_PROJECT}/${id}`,
      { ...body },
      { headers: { ...headerToken } })
  return result.data
}

export const apiGetListProject = async () => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(URL_PROJECT,
      { headers: { ...headerToken } })
  return result.data
}

export const apiGetProjectDetail = async (id) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(`${URL_PROJECT}/${id}`,
      { headers: { ...headerToken } })
  return result.data
}

export const apiDelProject = async (id) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .delete(`${URL_PROJECT}/${id}`,
      { headers: { ...headerToken } })
  return result.data
}

export const apiAddProjectTeamMember = async (id, body) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .post(`${URL_PROJECT}/${id}/member`,
      { ...body },
      { headers: { ...headerToken } })
  return result.data
}

export const apiGetProjectTeamMember = async (id) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(`${URL_PROJECT}/${id}/member`,
      { headers: { ...headerToken } })
  return result.data
}

export const apiAddProjectClient = async (id, body) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .post(`${URL_PROJECT}/${id}/client`,
      { ...body },
      { headers: { ...headerToken } })
  return result.data
}

export const apiGetProjectClient = async (id) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(`${URL_PROJECT}/${id}/client`,
      { headers: { ...headerToken } })
  return result.data
}

export const apiVerifyEmail = async (body) => {
  const result = await axios
    .post(`${URL_VERIFY_EMAIL}`,
      { ...body })
  return result.data
}

export const apiJoinProject = async (header, body) => {
  const result = await axios
    .post(`${URL_PROJECT}/join`,
      { ...body },
      { headers: { ...header } }
    )

  return result.data
}

export const apiValidResetPass = async (body) => {
  const result = await axios
    .post(URL_VERIFY_RESET_MAIL,
      { ...body },
    )

  return result.data
}
export const apiListTimezone = async (body) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(URL_TIMEZONE,
      { headers: { ...headerToken } })
  return result.data
}

export const apiGetListFeed = async (id) => {
  const headerToken = setHeaderByToken()
  const result = await axios
    .get(`${URL_PROJECT}/${id}/feeds`,
      { headers: { ...headerToken } })
  return result.data
}


export const apiListProduct = () => { }
export const apiCreateProduct = () => { }
export const apiEditProduct = () => { }
export const apiDelProduct = () => { }