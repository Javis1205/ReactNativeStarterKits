import _ from 'underscore'

export const campaign = (state = {activeCampaign:{}, updatedCampaignIndex: 0}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceActiveCampaign':
      return {...state, activeCampaign: payload }
    case 'app/replaceMoreActiveCampaign':
      let concatArray = payload
      //concatArray.results = []
      concatArray.results = state.activeCampaign.results.concat(concatArray.results)
      return {...state, activeCampaign: concatArray }
    case 'app/chooseACampaign':
      return {...state, chosenCampaign: payload }
    case 'app/addACampaign':
      let newCampaign = [payload, ...state.activeCampaign.results]
      return {...state, activeCampaign: {...state.activeCampaign, results: newCampaign} }
    case 'app/deleteAfterEditingACampaign':
      let indexOfUpdatedCampaign = _.findIndex(state.activeCampaign.results, {id: payload.id})
      let newUpdateCampaign = _.without(state.activeCampaign.results, _.findWhere(state.activeCampaign.results, {id: payload.id}))
      return {...state,  updatedCampaignIndex: indexOfUpdatedCampaign, activeCampaign: {...state.activeCampaign, results: newUpdateCampaign}}
    case 'app/addAfterDeletingACampaign':
      console.log(state.updatedCampaignIndex)
      let newUpdatedCampaign = state.activeCampaign.results
      newUpdatedCampaign.splice(state.updatedCampaignIndex, 0, payload)
      return {...state, activeCampaign: {...state.activeCampaign, results: newUpdatedCampaign} }
    case 'app/removeAllCampaign':
      return {...state, activeCampaign: {} }
    default:
      return state
  }
}

