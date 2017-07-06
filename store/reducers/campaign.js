
export const campaign = (state = {activeCampaign:{}}, {type, payload}) => {
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
    default:
      return state
  }
}

