
export const campaign = (state = {activeCampaign:{}}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceActiveCampaign':      
      return {...state, activeCampaign: payload }
    case 'app/chooseACampaign':
      return {...state, chosenCampaign: payload }
    default:
      return state
  }
}

