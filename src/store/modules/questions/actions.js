export function listRequest(page = 1) {
  return {
    type: '@questions/LIST_REQUEST',
    payload: { page },
  }
}

export function listSuccess(questions, page) {
  return {
    type: '@questions/LIST_SUCCESS',
    payload: { questions, page },
  }
}

export function listFailure() {
  return {
    type: '@questions/LIST_FAILURE',
  }
}

export function updateRequest(id, answer) {
  return {
    type: '@questions/UPDATE_REQUEST',
    payload: { id, answer },
  }
}

export function updateSuccess(question) {
  return {
    type: '@questions/UPDATE_SUCCESS',
    payload: { question },
  }
}

export function updateFailure() {
  return {
    type: '@questions/UPDATE_FAILURE',
  }
}

export function addQuestion(question) {
  return {
    type: '@questions/ADD_QUESTION',
    payload: { question },
  }
}
