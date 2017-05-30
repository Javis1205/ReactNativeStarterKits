import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { 
  Container, Button, List, Left, Right, Body,
  ListItem, InputGroup, Input, Picker, Text, Thumbnail,
  Form, Item, Switch, View,
} from 'native-base'

import options from './options'
import styles from './styles'

import * as dataActions from '~/store/actions/data'
import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'
import * as campaignSelectors from '~/store/selectors/campaign'

import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import Event from '~/ui/components/Event'
import DatePicker from '~/ui/components/DatePicker'
import PhotoChooser from '~/ui/components/PhotoChooser'
import Header from '~/ui/components/Header'
import Toggle from '~/ui/components/Toggle'

import { API_BASE } from '~/store/constants/api'
import { Field, reduxForm } from 'redux-form'

import { 
  InputField,
  DateField, 
  DropdownField,
} from '~/ui/elements/Form'

import { validate } from './utils'
import { profileCoverSource, avatarImage } from '~/assets'

@connect(state=>({  
  initialValues: accountSelectors.getProfile(state),  
  activeCampaign: campaignSelectors.getActiveCampaign(state),
}), {...commonActions, ...dataActions})
@reduxForm({ form: 'ProfileForm', validate})
export default class extends Component {  

  constructor(props) {
    super(props)    
    this.state = {
      avatar: avatarImage,      
    }
  }

  componentDidMount(){
    
  }

  loadCities(countries, value){        
    // this.props.getCities(countryCode)    
  }

  _handleChoosePhoto = ({uri, data})=>{
    // update 'data:image/jpeg;base64,' + data
    this.setState({avatar:{uri}})
  }

  _handleSave = (data)=>{
    
  }

  render() {        
    const {initialValues:profile, route, goBack, activeCampaign, handleSubmit} = this.props
    const {avatar, scrollY} = this.state    
   

  
    return (
      <Container>                                   
        
        <Button light transparent style={styles.buttonLeft} >
          <Icon small name="heart" />
          <Text small>8888 LP</Text>
        </Button>
        <Button light onPress={handleSubmit(this._handleSave)} transparent style={styles.buttonRight}>
          <Icon small name="fan" />
          <Text small>8888 Fans</Text>
        </Button>                     
        <View style={styles.avatarContainer}>      
          <Image source={avatar} style={styles.avatar}/>
          <PhotoChooser style={styles.photoIcon} onSuccess={this._handleChoosePhoto}/>                    
        </View>                              
        
        <Image style={styles.headerImage} source={profileCoverSource}>   

          <View style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',            
            top: 30,
          }}
          >
            <Button small transparent light style={{
              paddingLeft: 10,
            }} onPress={()=>goBack()}>
              <Icon name="arrow-left" style={{
                fontSize: 20,                
              }} />
            </Button>
            
            <View row>
              <Button small transparent light rounded bordered style={{
                borderColor: '#979797',
                marginRight: 10,                
              }}>
                <Text small>FOLLOW</Text>
              </Button>
              <Button small transparent light rounded bordered style={{
                borderColor: '#979797',
                width: 30,
                paddingLeft:0,
                paddingRight:0,
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon small name="more-horiz"/>
              </Button>
            </View>
            
          </View> 
          <View style={{                    
              position: 'absolute',
              bottom: 10,
              width: '100%',            
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <Text style={styles.userLabel}>{profile.DisplayName}</Text>
            <Text style={styles.subUserLabel} small>{profile.City}, {profile.Country}</Text>    
          </View> 
        </Image>

        <Content style={styles.container}>          
          <List
              removeClippedSubviews={false}                    
              pageSize={5}                  
              dataArray={activeCampaign.NewFeedsItemsList} renderRow={(feed) =>          
            <Event feed={feed} key={feed.CampaignId} />          
          }/>
        </Content>

      </Container>
    )
  }
}


