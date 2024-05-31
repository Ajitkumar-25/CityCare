import { useCallback, useEffect, useState } from 'react';
import { AppState, Alert } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const supportedMimeTypesByTheBackEnd = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/mkv',
];

const includeData = ['filename', 'fileSize', 'imageSize', 'playableDuration'];

const convertCameraRollPicturesToImageDtoType = (edges) => {
    const newPhotos = edges.map((edge) => {
        const d = new Date(edge.node.timestamp * 1000);
        const month = d.toLocaleString('default', { month: 'long', year: 'numeric' });
        return {
            size: edge.node.image.fileSize,
            filename: edge.node.image.filename,
            height: edge.node.image.height,
            width: edge.node.image.width,
            playableDuration: edge.node.image.playableDuration,
            path: edge.node.image.uri,
            mime: edge.node.type,
            month: month,
        }
    });
    return newPhotos;
}

export const useGallery = ({
    pageSize = 100,
    mimeTypeFilter = supportedMimeTypesByTheBackEnd,
    groupName = undefined,
    filter = "All",
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextCursor, setNextCursor] = useState();
    const [photos, setPhotos] = useState();

    const loadNextPagePictures = useCallback(async () => {
        try {
            nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: pageSize,
                after: nextCursor,
                assetType: filter,
                mimeTypes: mimeTypeFilter,
                groupName: groupName,
                include: includeData,
            });
            const photos = convertCameraRollPicturesToImageDtoType(edges);
            setPhotos((prev) => [...(prev ?? []), ...(photos || [])]);

            setNextCursor(page_info.end_cursor);
            setHasNextPage(page_info.has_next_page);
        } catch (error) {
            console.error('useGallery getPhotos error:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingNextPage(false);
        }
    }, [mimeTypeFilter, nextCursor, pageSize, filter]);

    const getUnloadedPictures = useCallback(async () => {
        try {
            setIsLoading(true);
            const { edges, page_info } = await CameraRoll.getPhotos({
                first: !photos || photos.length < pageSize ? pageSize : photos.length,
                assetType: filter,
                groupName: groupName,
                mimeTypes: mimeTypeFilter,
                include: includeData,
            });
            const newPhotos = convertCameraRollPicturesToImageDtoType(edges);
            setPhotos(newPhotos);

            setNextCursor(page_info.end_cursor);
            setHasNextPage(page_info.has_next_page);
        } catch (error) {
            // if (error.code === "E_UNABLE_TO_LOAD_PERMISSION")
            //     Alert.alert("", "Need storage permission to load files.")
            // else
            //     console.error('useGallery getNewPhotos error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [mimeTypeFilter, pageSize, photos, groupName, filter]);

    useEffect(() => {
        getUnloadedPictures();
    }, [groupName]);


    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active') {
                getUnloadedPictures();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [getUnloadedPictures]);

    return {
        photos,
        loadNextPagePictures,
        isLoading,
        isLoadingNextPage,
        hasNextPage,
    };
};