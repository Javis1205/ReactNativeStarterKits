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
