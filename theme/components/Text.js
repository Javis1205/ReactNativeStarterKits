import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const textTheme = {
      fontSize: variables.DefaultFontSize - 1,
      fontFamily: variables.fontFamily,
      color: variables.textColor,
      '.bold': {
        fontWeight: '600',
      },
      '.active': {
        color: variables.tabBarActiveTextColor,
      },
      '.link':{
        color: variables.linkTextColor,
      },
      '.note': {
        color: variables.noteTextColor,
        fontSize: variables.noteFontSize
      },
      '.small': {
        fontSize: variables.btnTextSizeSmall,
        lineHeight: variables.btnTextSizeSmall + 2,
      },
      '.large': {
        fontSize: variables.btnTextSizeLarge
      },
      '.white': {
        color: 'white'
      }
  };

  return textTheme;
};
