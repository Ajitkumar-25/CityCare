import moment from "moment";
import {
  ToastAndroid,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { checkMultiple, PERMISSIONS, requestMultiple } from 'react-native-permissions';
//import analytics from '@react-native-firebase/analytics';

// import Clipboard from '@react-native-clipboard/clipboard';


// export const copyToClipboard = (text, msg = "Copied to Clipboard!") => {
//   Clipboard.setString(text);
// };

export const isEvtExpired = (data) => {
  const endDate = moment(data?.end_date).format('YYYY-MM-DDT00:00:00.000Z');
  const nowDate = moment(new Date().toISOString(), 'YYYY-MM-DD').format('YYYY-MM-DDT00:00:00.000Z');
  const endTime = moment(data?.end_time, "HH:mm").format('HH:mm');
  const nowTime = moment(new Date().toISOString()).format('HH:mm');

  let isExpired = false;
  if (endDate < nowDate) {
    isExpired = true;
  } else if (endDate === nowDate && endTime < nowTime) {
    isExpired = true;
  }
  return isExpired;
};

export const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

export const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const checkPermission = async () => {
  if (parseInt(Platform.Version, 10) > 32) return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'App needs access to your storage to download files',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      showToast("Storage Permission Not Granted");
    }
  } catch (err) {
    alert('Cannot Download on this device');
  }
}

export const downloadRemoteFile = async (url) => {
  const continu = await checkPermission();
  if (!continu) return;

  showToast("Downloading...");
  let date = new Date();
  const ext = getUrlExtension(url);
  const { config } = RNFetchBlob;
  // let downpath = ${fs.dirs.SDCardDir}/ApnaKonnect/${getFolderName(ext)}/${date.getTime()}.${ext};
  let downpath = `${fs.dirs.DownloadDir}/ApnaKonnect/${date.getTime()}.${ext}`;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: false,
      path: downpath,
      description: 'Media File',
    },
  };
  config(options)
    .fetch('GET', url)
    .then(res => {
      // console.log(res);
      showToast("Downloaded");
    }).catch((err) => console.log(err));
}

export const getFolderName = (ext) => {
  switch (ext) {
    case 'jpeg':
      return 'Images';
    case 'jpg':
      return 'Images';
    case 'png':
      return 'Images';
    case 'mp4':
      return 'Videos';
    case 'mkv':
      return 'Videos';
    case 'm4a':
      return 'Videos';
    case 'gif':
      return 'GIF';
    default:
      return 'Others';
  }
}

export const formatPlayDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - (hours * 3600)) / 60);
  const seconds = duration - (hours * 3600) - (minutes * 60);

  const formattedTime = (hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "") +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds);

  return formattedTime;
}

export const checkGalleryPermission = async (onGrant) => {
  try {
    let permissions = [];
    if (parseInt(Platform.Version, 10) > 32) {
      permissions.push(Platform.select({ android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES }));
      permissions.push(Platform.select({ android: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO }));
    } else {
      permissions.push(Platform.select({ android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE }));
    }
    const toBeRequested = await checkMultiple(permissions).then(result => {
      return Object.keys(result).filter(it => result[it] !== 'granted');;
    });
    const results = await requestMultiple(toBeRequested);
    const anyDenied = Object.values(results).filter(status => status !== "granted").length;
    if (anyDenied) {
      showToast("Permission Not Granted");
      return;
    }
    if (onGrant) onGrant();
  } catch (err) {
    console.log("PERMS ERR is", err);
  }
}

export const checkCameraPermission = async (onGrant) => {
  try {
    let permissions = [];
    permissions.push(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA }))

    const toBeRequested = await checkMultiple(permissions).then(result => {
      return Object.keys(result).filter(it => result[it] !== 'granted');;
    });
    const results = await requestMultiple(toBeRequested);
    const anyDenied = Object.values(results).filter(status => status !== "granted").length;
    if (anyDenied) {
      showToast("Permission Not Granted");
      return;
    }
    if (onGrant) onGrant();
  } catch (err) {
    console.log("PERMS ERR is", err);
  }
}

export const checkAudioPermission = async (onGrant) => {
  try {
    let permissions = [];
    permissions.push(Platform.select({ ios: PERMISSIONS.IOS.MICROPHONE, android: PERMISSIONS.ANDROID.RECORD_AUDIO }))

    const toBeRequested = await checkMultiple(permissions).then(result => {
      return Object.keys(result).filter(it => result[it] !== 'granted');;
    });
    const results = await requestMultiple(toBeRequested);
    const anyDenied = Object.values(results).filter(status => status !== "granted").length;
    if (anyDenied) {
      showToast("Permission Not Granted");
      return;
    }
    if (onGrant) onGrant();
  } catch (err) {
    console.log("PERMS ERR is", err);
  }
}

// export const fbAnaltytics = async (eventName, data) => {
//   await analytics().logEvent(eventName, data);
// }

// export const backgroundUpload = (options, funcs) => {
//   const { onStart, onProgress, onError, onCancel, onComplete } = funcs
//   Upload.startUpload(options).then((uploadId) => {
//     onStart && onStart(uploadId);
//     Upload.addListener('progress', uploadId, (data) => {
//       onProgress && onProgress(data, uploadId);
//     })
//     Upload.addListener('error', uploadId, (data) => {
//       onError && onError(data, uploadId);
//     })
//     Upload.addListener('cancelled', uploadId, (data) => {
//       onCancel && onCancel(data, uploadId)
//     })
//     Upload.addListener('completed', uploadId, (data) => {
//       const jsonData = JSON.parse(data.responseBody);
//       onComplete && onComplete(jsonData, uploadId);
//     })
//   }).catch((err) => {
//     console.log('Upload error!', err)
//   })
// }

// export const cancelBackgroundUpload = (uploadId) => Upload.cancelUpload(uploadId)