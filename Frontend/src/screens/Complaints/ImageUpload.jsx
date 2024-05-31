import { View, Text ,Button} from 'react-native'
import React from 'react'
import { launchCamera,launchImageLibrary } from 'react-native-image-picker'
import { max } from 'moment'
const options={
   title: 'Select Image',
   type:'library',
   options:
   {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'mixed',
    includeBase64: false,
   } 
}
const ImageUpload = () => {
    const openGallery = async () => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
          } else {
            const formData = new FormData();
            formData.append('media', {
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
            });
    
            fetch('YOUR_UPLOAD_URL', {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then((res) => res.json())
              .then((response) => {
                console.log(response, 'response');
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        });
      }
  return (
    <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
      <Button title ="Upload Image" onPress={openGallery} />
    </View>
  )
}

export default ImageUpload;