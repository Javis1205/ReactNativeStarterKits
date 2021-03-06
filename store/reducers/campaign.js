import _ from 'underscore'

export const campaign = (state = {activeCampaign:{}, updatedCampaignIndex: 0, noData: true}, {type, payload}) => {
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
      if (indexOfUpdatedCampaign != -1) {
        let newUpdateCampaign = _.without(state.activeCampaign.results, _.findWhere(state.activeCampaign.results, {id: payload.id}))
        return {
          ...state,
          updatedCampaignIndex: indexOfUpdatedCampaign,
          activeCampaign: {
            ...state.activeCampaign,
            results: JSON.parse(JSON.stringify(newUpdateCampaign))
          }
        }
      } else {
        return {
          ...state,
          updatedCampaignIndex: indexOfUpdatedCampaign,
          activeCampaign: {
            ...state.activeCampaign,
          }
        }
      }
      
    
    case 'app/addAfterDeletingACampaign':
      if (state.updatedCampaignIndex != -1) {
        let newUpdatedCampaign = state.activeCampaign.results
        newUpdatedCampaign.splice(state.updatedCampaignIndex, 0, payload)
        return {
          ...state,
          activeCampaign: {
            ...state.activeCampaign,
            results: JSON.parse(JSON.stringify(newUpdatedCampaign))
          }
        }
      } else {
        return {
          ...state,
          activeCampaign: {
            ...state.activeCampaign
          }
        }
      }
      
      
    case 'app/removeAllCampaign':
      return {...state, activeCampaign: {} }
    case 'app/setNoData':
      return {...state, noData: payload }
    default:
      return state
  }
}

