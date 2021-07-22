import React from 'react'
import { Row } from 'react-bootstrap'
import AppTitle from './../homepage_components/App_title'
import ProfileButtons from './Profile_buttons'


function ProfileHeader() {


    return (
        <Row>
            <main className="col">
                <AppTitle></AppTitle>
            </main>
            <ProfileButtons></ProfileButtons>
        </Row>
    )
}

export default ProfileHeader
