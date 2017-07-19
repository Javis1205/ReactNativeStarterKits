// action requestors

export const getActiveCampaign = (...args) => ({
  type: 'app/getActiveCampaign',
  args
})


// action creators
export const replaceActiveCampaign = (data) => ({
  type: 'app/replaceActiveCampaign',
  payload: data,
})

export const getMoreActiveCampaign = (...args) => ({
  type: 'app/getMoreActiveCampaign',
  args
})

export const replaceMoreActiveCampaign = (data) => ({
  type: 'app/replaceMoreActiveCampaign',
  payload: data,
})

export const createCampaign = (...args) => ({
  type: 'app/createCampaign',
  args
})

export const getDetailedCampaign = (...args) => ({
  type: 'app/getDetailedCampaign',
  args
})

export const getUserCampaign = (...args) => ({
  type: 'app/getUserCampaign',
  args
})

export const chooseACampaign = (data) => ({
  type: 'app/chooseACampaign',
  payload: data,
})

export const editCampaign = (...args) => ({
  type: 'app/editCampaign',
  args
})

export const addACampaign = (data) => ({
  type: 'app/addACampaign',
  payload: data,
})

export const deleteAfterEditingACampaign = (data) => ({
  type: 'app/deleteAfterEditingACampaign',
  payload: data
})

export const addAfterDeletingACampaign = (data) => ({
  type: 'app/addAfterDeletingACampaign',
  payload: data
})

export const removeAllCampaign = () => ({
  type: 'app/removeAllCampaign'
})

export const getTemporaryActiveCampaign = (...args) => ({
  type: 'app/getTemporaryActiveCampaign',
  args
})

export const setNoData = (data) => ({
  type: 'app/setNoData',
  payload: data
})

