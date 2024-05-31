import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Modal, SectionList, Pressable, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { useGallery } from './useGallery' 
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
//import { Icon } from '../../../assets/Icon'; // to be placed

import {Fonts} from '../../../assets/Fonts';
import { formatPlayDuration } from '../../../helper' // to be checked
import Album from './Album'; //to be checked
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video'; // to be checked
import FastImage from 'react-native-fast-image'; // to be checked
import {Icon} from '../../../assets/Icon'
import LinearGradient from 'react-native-linear-gradient'

import {COLORS} from '../../../model';

import moment from 'moment';
import { checkCameraPermission } from '../../../helper';//to be checked

const renderMonthHeader = ({ section }) => <Text style={styles.monthText}>{section.title}</Text>

const ImagePickerModal = ({ visible = true, onClose = () => null, onSubmit = () => null, max = undefined, filter = "All" }) => {
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [errorModal, setErrorModal] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [activeTab, setActiveTab] = useState("album");
    const [selectedAlbumName, setSelectedAlbumName] = useState("Recent");
    const { photos, loadNextPagePictures, isLoading, hasNextPage } = useGallery({ groupName: selectedAlbum, filter });

    const toggleSelection = (item, selectedIndex) => {
        if (!item?.path) return;
        if (selectedIndex === -1) {
            if (max ? selectedMedia.length < max : true) {
                if (max === 1)
                    setActiveTab("upload");
                setSelectedMedia((prev) => [...prev, item]);
            } else {
                Alert.alert("", "Maximum file selected!");
            }
        } else {
            let temp = [...selectedMedia];
            temp.splice(selectedIndex, 1);
            setSelectedMedia(temp);
        }
    }

    const openCropper = (item, index) => {
        if (!item?.path) return;

        ImagePicker.openCropper({
            path: item.path,
            freeStyleCropEnabled: true
        }).then(resp => {
            const fileName = resp.path.split("/")[resp.path.split("/").length - 1];
            const tempItem = {
                "filename": fileName,
                "height": resp.height,
                "mime": resp.mime,
                "month": moment().format("MMMM"),
                "path": resp.path,
                "playableDuration": null,
                "size": resp.size,
                "width": resp.width
            }
            setSelectedMedia(prev => {
                let tempSelectedItems = [...prev];
                tempSelectedItems[index] = tempItem;
                return tempSelectedItems
            })
        }).catch((err) => console.log("CROPPER ERROR IS", err));
    }
    const renderItem = useCallback(({ item }) => {
        if (!item?.path) return <></>;
        if (isLoading) return <View style={{ width: wp(33), height: wp(33), padding: wp(0.5), position: "relative" }}>
        <ActivityIndicator size="large" color="#5B9092" />
        </View>;
        const selectedIndex = selectedMedia.findIndex(element => element.path === item.path);

        return <Pressable style={{ width: wp(33), height: wp(33), padding: wp(0.5), position: "relative" }} onPress={() => toggleSelection(item, selectedIndex)}>
            <View style={{}}>
                <FastImage source={{ uri: item.path }} style={{ width: wp(32), height: wp(32) }} />
            </View>
            {item.mime.startsWith("video") ? <View style={{ position: "absolute", bottom: wp(2), left: wp(2), flexDirection: "row", alignItems: "center" }}>
                <FastImage source={Icon.Play} style={{ height: 16, width: 16 }} />
                <Text style={{ fontSize: 13, color: "#F6EEEE", fontWeight: "700", marginLeft: wp(1) }}>{formatPlayDuration(item.playableDuration)}</Text>
            </View> : null}
            <View style={{ position: "absolute", top: wp(2), left: wp(2) }}>
                {selectedIndex === -1 ?
                    <View style={{ borderRadius: 9999, borderWidth: 1.5, borderColor: "#fff", height: 14, width: 14, }} />
                    :
                    <View style={{ borderRadius: 9999, borderWidth: 1.5, borderColor: "#fff", height: 14, width: 14, backgroundColor: "#fff", elevation: 5, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#171717", fontSize: 10, fontFamily: Fonts.Medium, lineHeight: 12.5 }}>{selectedIndex + 1}</Text>
                    </View>
                }
            </View>
        </Pressable>
    }, [selectedMedia,isLoading])

    const groupPhotosByMonth = useCallback(() => {
        if (!photos) return [];
        const months = [];
        photos.forEach((photo) => {
            const monthIndex = months.findIndex((month) => month.title === photo.month);
            if (monthIndex === -1) {
                months.push({ title: photo.month, data: [photo] });
            } else {
                months[monthIndex].data.push(photo);
            }
        });
        return months;
    }, [photos]);

    const selectAlbum = useCallback((albumName) => {
        setSelectedAlbum(albumName);
        setSelectedAlbumName(albumName);
        setActiveTab("gallery");
    }, [],)

    const handleBack = () => {
        if (activeTab === "gallery") {
            setActiveTab("album");
        } else if (activeTab === "upload") {
            setActiveTab("gallery");
        } else {
            onClose();
            setSelectedMedia([]);
            setActiveTab("album");
            setSelectedAlbum();
        }
    }

    const handleNext = () => {
        if (selectedMedia.length > 0) {
            setActiveTab("upload");
        } else {
            // showError('Select atleast one file!')
            setErrorModal(true)
        }
    }

    const submit = () => {
        onSubmit(selectedMedia);
        setSelectedMedia([]);
        setActiveTab("album");
        setSelectedAlbum();
    }

    const tryCamera = () => checkCameraPermission(() => openCamera())

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            multiple: true,
            mediaType: filter === "Videos" ? "video" : "photo",
            compressImageQuality: 0.4,
        }).then(image => {
            let files = [];
            if (Array.isArray(image)) {
                files = image.map(i => ({ ...i, filename: i.filename || i.path.split("/").pop() }));
            }
            else {
                files = [{ ...image, filename: image.filename || image.path.split("/").pop() }]
            };
            setSelectedMedia(prev => [...prev, ...files]);
            setActiveTab("upload");
        }).catch(e => {
            console.log('openCamera ERR', e, e.code, e.message);
        });
    }

    useEffect(() => {
        if (visible)
            CameraRoll.getAlbums({ assetType: filter }).then(resp => setAlbums([{ title: undefined }, ...resp]))
    }, [visible])

    const handleGalleryClick = () => {
        setActiveTab("gallery");
        setSelectedAlbumName("Gallery");
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={handleBack}
        >
            <View style={{ flex: 1, backgroundColor: "#fff", marginVertical: Platform.select({ ios: hp(5) }) }}>
                <View style={{ height: 50, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={handleBack} style={{ height: 30, width: 48, justifyContent: "center" }}>
                        <FastImage style={{ width: 30, height: 19.5 }} source={activeTab === "upload" ? Icon.Back3 : Icon.Back2} resizeMode="cover" />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                        {activeTab === "album" ?
                            <Text style={{ fontSize: 24, color: "#171717" }}>
                                Albums
                            </Text>
                            : activeTab === "gallery" ?
                                <Text style={{ fontSize: 24, color: "#171717" }}>
                                {selectedAlbumName || "Recent"}
                                </Text>
                                : activeTab === "upload" ? <Text style={{ fontSize: 16, color: "#5B9092" }}>
                                    Albums
                                </Text>
                                    : null
                        }
                        {selectedMedia.length > 0 ?
                            <View style={{ backgroundColor: "#5B9092", height: 16, width: 16, marginLeft: 8, borderRadius: 9999, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 13, color: "#fff", textAlign: "center", lineHeight: 16.25, fontWeight: "500" }}>{selectedMedia.length}</Text>
                            </View>
                            : null}
                    </View>
                    <Text style={[{ 
                        height: 26, width: 48, borderRadius: 8, borderWidth: 0.33, borderColor: "#171717", alignItems: "center", justifyContent: "center",opacity:0 },{ fontSize: 15, color: "transparent" }]}>Next</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={{ borderTopColor: "#cbcbcc", borderTopWidth: 0.5, height: 0, width: activeTab === "upload" ? "100%" : "65%" }} />
                </View>

                {activeTab === "album" ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={albums}
                            numColumns={2}
                            renderItem={({ item }) => <Album item={item} onPress={selectAlbum} />}
                            keyExtractor={(_, index) => index}
                            contentContainerStyle={{ padding: wp(2) }}
                        />
                    </View>
                    :
                    null
                }

                {activeTab === "gallery" ?
                    <View style={{ flex: 1 }}>
                        {/* {isLoading ? <FetchLoader /> : */}
                            <SectionList
                                sections={groupPhotosByMonth()}
                                keyExtractor={(item, index) => item + index}
                                showsVerticalScrollIndicator={false}
                                renderSectionHeader={renderMonthHeader}
                                contentContainerStyle={{ padding: wp(0.5) }}
                                disableVirtualization={true}
                                renderItem={({ section, index }) => {
                                    if (index !== 0) return null;
                                    return <FlatList
                                        disableVirtualization={true}
                                        getItemLayout={(data, index) => {
                                            return { index, length: wp(33), offset: wp(33) * index }
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        data={section.data}
                                        numColumns={3}
                                        renderItem={renderItem}
                                        keyExtractor={(_, index) => index}
                                        onEndReachedThreshold={20}
                                        onEndReached={() => { if (hasNextPage) loadNextPagePictures() }}
                                    />
                                }}
                            />
                        {/* } */}
    <View style={{ position: 'absolute', bottom: 4, left: 10, right: 10, flexDirection: 'column', justifyContent: 'flex-end',alignItems:'flex-end',}}>
            {activeTab !== "upload" ? (
                <TouchableOpacity onPress={handleNext} style={{ paddingHorizontal: 23, paddingVertical: 7, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 9999, borderWidth: 2, borderColor: "#374A62", elevation: 5,margin:5}}>
                <Text style={{ fontFamily: Fonts.Bold, fontSize: 14, color: "#374A62"}}>Next</Text>
                </TouchableOpacity>
            ) : null}
            {activeTab === "gallery" && selectedMedia.length > 0 ? (
                <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 7, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 9999, borderWidth: 2, borderColor: "red", elevation: 5, margin:5}} onPress={() => setSelectedMedia([])}>
                <Text style={{ fontFamily: Fonts.Bold, fontSize: 14, color: 'red'}}>Clear All</Text>
                </TouchableOpacity>
            ) : null}
    </View>
                {errorModal && 
                      <Modal
                      visible={errorModal}
                      animationType="fade"
                      transparent={true}
                      statusBarTranslucent
                    >
                      <Pressable
                        style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: "#0005" }}
                      >
                        <Pressable
                          style={{ padding: 16, borderRadius: 16, backgroundColor: "#fff" }}
                        >
                          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      {/* <Text style={{ fontFamily: Fonts.Medium, color: "#000000", fontSize: 17 }}>Apna Konnect</Text> */}
                      {/* <View style={{ width: 100, position: "relative" }}>
                    <Image source={Images.imgSoftUpdate} style={{ position: "absolute", top: -40, height: 100, width: 100 }} />
                  </View> */}
                    </View>
                            <Text style={{ fontFamily: Fonts.Medium, color: "#000000", fontSize: 17 }}>Select atleast one file!</Text>
                            {/* <View style={{ width: 100, position: "relative" }}>
                          <Image source={Images.imgSoftUpdate} style={{ position: "absolute", top: -40, height: 100, width: 100 }} />
                        </View> */}
                          {/* </View> */}
                          {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}> */}
                            <TouchableOpacity
                              onPress={() => {
                                setErrorModal(false) 
                                // this.setState({ showDeleteModal: false })
                            }}
                              style={{ backgroundColor: "#5B9092", paddingVertical: 9, paddingHorizontal: 10, borderRadius: 15, alignItems: "center", justifyContent: "center",marginTop:12 }}>
                              <Text style={{ fontFamily: Fonts.Medium, color: "#fff", fontSize: 14 }}>Ok</Text>
                            </TouchableOpacity>
                          {/* </View> */}
              
                        </Pressable>
                      </Pressable>
                    </Modal >
                }


                    </View>
                    :
                    null
                }

                {activeTab === "upload" ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={selectedMedia}
                            renderItem={({ item, index }) => {
                                if (item.mime.startsWith("video")) {
                                    if (Platform.OS === 'ios') {
                                        const appleId = item.path.substring(5, 41);
                                        const fileNameLength = item.filename.length;
                                        const ext = item.filename.substring(fileNameLength - 3);
                                   //     const uri = assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext};
                                        return (
                                            <View style={{ position: "relative" }}>
                                                <LinearGradient
                                                    COLORS={['#0004', '#0000', '#0000', '#0000', '#0000', '#0000', '#0000',]}
                                                    start={{ x: 1, y: 0 }}
                                                    end={{ x: 0, y: 1 }}
                                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                                                    <View style={{ position: "absolute", zIndex: 2, top: wp(2), right: wp(4), flexDirection: "row", alignItems: "center" }}>
                                                        <TouchableOpacity onPress={() => toggleSelection(item, index)}>
                                                            <FastImage style={{ tintColor: COLORS.White, width: wp(7), height: wp(7), marginLeft: wp(2) }} source={Icon.icnCloseSquare} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </LinearGradient>
                                                <Video resizeMode="contain" style={{ width: wp(95), height: wp(95) * item.height / item.width, marginBottom: wp(2.5) }} source={{ uri: uri }} muted />
                                            </View>
                                        );
                                    }
                                    else if (Platform.OS === 'android') {
                                        return (
                                            <View style={{ position: "relative" }}>
                                                <LinearGradient
                                                    COLORS={['#0004', '#0000', '#0000', '#0000', '#0000', '#0000', '#0000',]}
                                                    start={{ x: 1, y: 0 }}
                                                    end={{ x: 0, y: 1 }}
                                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                                                    <View style={{ position: "absolute", zIndex: 2, top: wp(2), right: wp(4), flexDirection: "row", alignItems: "center" }}>
                                                        <TouchableOpacity onPress={() => toggleSelection(item, index)}>
                                                            <Image style={{ tintColor: COLORS.White, width: wp(7), height: wp(7), marginLeft: wp(2) }} source={Icon.icnCloseSquare} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </LinearGradient>
                                                <Video resizeMode="contain" style={{ width: wp(95), height: wp(95) * item.height / item.width, marginBottom: wp(2.5) }} source={{ uri: item.path }} muted />
                                            </View>
                                        );
                                    }
                                }
                                else
                                    return <View style={{ position: "relative" }}>
                                        <LinearGradient
                                            COLORS={['#0004', '#0000', '#0000', '#0000', '#0000', '#0000', '#0000',]}
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                                            <View style={{ position: "absolute", zIndex: 2, top: wp(2), right: wp(2), flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity onPress={() => openCropper(item, index)}>
                                                    <Image style={{ tintColor: COLORS.White, width: wp(7), height: wp(7) }} source={Icon.icnEditSquare} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => toggleSelection(item, index)}>
                                                    <Image style={{ tintColor: COLORS.White, width: wp(7), height: wp(7), marginLeft: wp(2) }} source={Icon.icnCloseSquare} />
                                                </TouchableOpacity>
                                            </View>
                                        </LinearGradient>
                                        <FastImage style={{ width: wp(95), height: wp(95) * item.height / item.width, marginBottom: wp(2.5) }} source={{ uri: item.path }} />
                                    </View>
                            }}
                            keyExtractor={(_, index) => index}
                            contentContainerStyle={{ padding: wp(2) }}
                        />
                    </View>
                    :
                    null
                }

                {activeTab === "upload" ?
                    <View style={{ paddingVertical: wp(2.5), alignItems: "center" }}>
                        {selectedMedia.length ?
                            <TouchableOpacity onPress={submit} activeOpacity={0.8} style={{ backgroundColor: "#5B9092", borderRadius: 10, alignItems: "center", justifyContent: "center", height: 50, width: "95%" }}>
                                <Text style={{ color: "#fff", fontSize: 16, fontFamily: Fonts.Bold }}>Upload Files</Text>
                            </TouchableOpacity>
                            : null
                        }
                        {max && selectedMedia.length >= max ?
                            null :
                            <TouchableOpacity onPress={() => setActiveTab("gallery")} activeOpacity={0.8} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, width: "30%", marginTop: 16, justifyContent: "space-around" }}>
                                <FastImage style={{ width: 30, height: 30 }} source={Icon.AddMedia} />
                                <Text style={{ color: "#171717", fontSize: 9, fontFamily: Fonts.Regular }}>Add more...</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    :
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: 8 }}>
                        <TouchableOpacity onPress={tryCamera} style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10 }}>
                            <FastImage style={{ height: 24, width: 24 }} source={Icon.Camera} />
                            <Text style={{ color: "#4C4E50", fontSize: 8, fontFamily: Fonts.Medium }}>Camera</Text>
                        </TouchableOpacity>
                        {activeTab === "album" ?
                            <TouchableOpacity style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, backgroundColor: "#5B9092" }}>
                                <FastImage style={{ height: 24, width: 24 }} source={Icon.Album2} />
                                <Text style={{ color: "#fff", fontSize: 8, fontFamily: Fonts.Medium }}>Album</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setActiveTab("album")} style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, backgroundColor: "transparent" }}>
                                <FastImage style={{ height: 24, width: 24 }} source={Icon.Album} />
                                <Text style={{ color: "#4C4E50", fontSize: 8, fontFamily: Fonts.Medium }}>Album</Text>
                            </TouchableOpacity>
                        }
                        {activeTab === "gallery" ?
                            <TouchableOpacity style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, backgroundColor: "#5B9092" }}>
                                <FastImage style={{ height: 24, width: 24 }} source={Icon.Gallery2} />
                                <Text style={{ color: "#fff", fontSize: 8, fontFamily: Fonts.Medium }}>Gallery</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={handleGalleryClick} style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, backgroundColor: "transparent" }}>
                                <FastImage style={{ height: 24, width: 24 }} source={Icon.Gallery} />
                                <Text style={{ color: "#4C4E50", fontSize: 8, fontFamily: Fonts.Medium }}>Gallery</Text>
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>
        </Modal>
    )
}

export default ImagePickerModal

const styles = StyleSheet.create({
    monthText: { color: "#827C7C", fontSize: 18, padding: 16, paddingBottom: 0, fontFamily: Fonts.Regular },
})