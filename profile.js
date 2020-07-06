// photo stuff
let file = {};
function choseFile(event) {
    file = event.target.files[0]
    console.log(file)
}

auth.onAuthStateChanged(user => {
    if(!user){
        if (confirm("Please login to continue") == true) {
            window.location.href="index.html"
        } else {
            window.location.href="index.html"

        }
    }else {
        // change page title
        var userId = user.uid;
        // getting fields
        
        const fullName = document.querySelector('#fullName');
        const email = document.querySelector('#email');
        const phone = document.querySelector('#phone');
        const type = document.querySelector('#type');
        const gender = document.querySelector('#gender');
        const age = document.querySelector('#age')
        
        console.log(fullName,type,email,phone,gender,age);
        // change prof pic
        var profileImage =  document.querySelector('#profileImage');
        storage.ref('users/'+userId+'/profile.jpg').getDownloadURL().then(imgurl=>{
            profileImage.src = imgurl;
        }).catch(err =>{
            console.log(err);
        })
        

        
        // getting data from db
        
        
        db.collection('users').doc(userId).get().then((snapshot)=>{
            fullName.innerHTML = snapshot.data()['firstName'] +" "+ snapshot.data()['lastName'];
            type.innerHTML =`${snapshot.data()['type'] == 'volunteer'?"<strong>volunteer</strong>":''} `;
            email.innerHTML =   `<div>${snapshot.data()['email']}</div>`;
            phone.innerHTML = snapshot.data()['phone'];
            age.innerHTML = snapshot.data()['age'];
            gender.innerHTML = snapshot.data()['gender'];
            // change page title
            document.querySelector('title').innerHTML = `${snapshot.data()['firstName']} ${snapshot.data()['lastName']} | Pledge`
            
        })
        
        // Change photo stuff 
        document.querySelector('#changePhotoForm').addEventListener('submit',e=>{
            e.preventDefault();
            document.querySelector('.prog').style.display = 'flex';
            storage.ref('users/' + userId + '/profile.jpg').put(file)
            .then(()=>{

                alert('Successfully Uploaded!');
                window.location.href="profile.html"
                
            }).catch(err => {
                console.log(err)
            })
            
            
        })
        

        // Logout
        document.querySelector('#logout').addEventListener("click", e=>{
            auth.signOut().then(function() {
                window.location.href="index.html"

                // Sign-out successful.
              }).catch(function(error) {
                console.log(error)
              });
        })

        

        

        
        // explore button
        document.querySelector('#explore').addEventListener('click', e=>{
            window.location.href="explore.html"

        })

        


        

        
        

        
        
        

        

        

        
        

        

        
        
        
        


        
        
    }
})


    