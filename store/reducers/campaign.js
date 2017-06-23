
export const campaign = (state = {activeCampaign:{}}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceActiveCampaign':
      if (!state.activeCampaign.results) {
        return {...state, activeCampaign: payload }
      } else {
        let concatArray = payload
        //concatArray.results = []
        concatArray.results = state.activeCampaign.results.concat(concatArray.results)
        return {...state, activeCampaign: concatArray }
      }
    case 'app/chooseACampaign':
      return {...state, chosenCampaign: payload }
    default:
      return state
  }
}

