import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Container, Spinner,NativeBaseProvider} from 'native-base'

const EmptyContainer = () => {
    return(
      <NativeBaseProvider style={styles.emptyContainer}>
        <Container style={styles.emptyContainer}>
         <Spinner/>
        </Container>
        </NativeBaseProvider>
    )
}

export default EmptyContainer

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        backgroundColor: "#1b262c",
        justifyContent: 'center',
        alignItems: "center"
    }
})