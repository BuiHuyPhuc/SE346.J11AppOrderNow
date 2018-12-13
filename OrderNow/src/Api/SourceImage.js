import React, { Component } from 'react';
import {
  StyleSheet, Dimensions
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const { width, height } = Dimensions.get("window");

const SourceImage = sourceIcon => {
	let source = resolveAssetSource(sourceIcon);
	let imgWidth = (width - 20) / 2;
	let imgHeight = (imgWidth / source.width) * source.height;
	return ({ imgWidth, imgHeight });
}

export default SourceImage;
