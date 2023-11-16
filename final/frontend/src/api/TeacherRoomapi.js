import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
//Assignment apis
export const insertAssignment = (payload) =>
  api.post("/insertAssignment", payload);
export const getAssignment = (payload) => api.post("/getAssignment", payload);
export const insertStudentAssignmentWork = (payload) => api.post("/insertStudentAssignmentWork", payload);
export const getStudentAssignmentWork = (payload) => api.post("/getStudentAssignmentWork", payload);
//Notes apis
export const insertNotes = (payload) => api.post("/insertNotes", payload);
export const getNotes = (payload) => api.post("/getNotes", payload);
//Class Mates apis
export const getMates = (payload) => api.post("/Mates", payload);
//tests apis
export const insertTests = (payload) => api.post("/insertTests", payload);
export const getTests = (payload) => api.post("/getTests", payload);
export const submitTests = (payload) => api.post("/submitTests", payload);
export const getsubmitTests = (payload) => api.post("/getsubmitTests", payload);

//Msgs apis
export const insertMsg = (payload) => api.post("/insertMsg", payload);
export const getMsg = (payload) => api.post("/getMsg", payload);

export const Assignment = {
  insertAssignment,
  getAssignment,
  insertStudentAssignmentWork,
  getStudentAssignmentWork
};

export const Note = {
  insertNotes,
  getNotes,
};

export const Mate = {
  getMates,
};

export const TestApi = {
  insertTests,
  getTests,
  submitTests,
  getsubmitTests
};


export const Msg = {
  insertMsg,
  getMsg,
};
export default Assignment;
