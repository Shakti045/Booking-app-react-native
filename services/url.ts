const baseurl='https://bookingappserver-64mt.onrender.com/api/v1'

export const authurls={
    getotp:baseurl+'/sendotp',
    signup:baseurl+"/signup",
    login:baseurl+"/login"
}

export const userurls={
    getuserdetails:baseurl+"/getuserdetails",
    updateprofilephoto:baseurl+"/updateprofilephoto"
}

export const orderurls={
    bookorder:baseurl+'/bookorder',
    getallorders:baseurl+'/getallbookingsofuser'
}