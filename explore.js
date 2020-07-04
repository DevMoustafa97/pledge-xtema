console.log('hi');

auth.onAuthStateChanged(user=>{
    if(!user) {
        alert('Please Login to continue!')
        window.location.href="index.html"

    }else{
        
        const userId = user.uid

        // nav bar
        // image
        const navImg = document.querySelector('#navImg');
        console.log(navImg.src)
        storage.ref('users/'+userId+'/profile.jpg').getDownloadURL().then(imgurl=>{
            navImg.src = imgurl;
        }).catch(err =>{
            console.log(err);
        })
        // hold
        // getting signed in user info
        let authuser;
        db.collection('users').doc(userId).get().then((snapshot)=>{
            authuser = snapshot.data()
        }).then(()=>{document.querySelector('#navName').innerHTML = `${authuser['firstName']} ${authuser['lastName']}`})

        
        // LOGOUT BUTTON
        document.querySelector('#logout').addEventListener("click", e=>{
            auth.signOut().then(function() {
                
                window.location.href="index.html"
                
              }).catch(function(error) {
                console.log(error)
              });
        })

        // Writing post and uploading to fire store
        const postForm = document.querySelector('#post-form');


        postForm.addEventListener('submit',e=>{
            e.preventDefault();
            // getting form values
            const formtxt =  postForm['post-text'].value[0].toUpperCase() + postForm['post-text'].value.substr(1) 
            const formcity =  postForm['post-city'].value[0].toUpperCase() + postForm['post-city'].value.substr(1) 
            const formarea =  postForm['post-area'].value[0].toUpperCase() + postForm['post-area'].value.substr(1) 
            // getting user values
            const formfullName = `${authuser['firstName']} ${authuser['lastName']}`;
            const formmail = authuser['email'];
            const formphone = authuser['phone'];

            db.collection('posts').doc(userId).set({
                txt:formtxt,
                city:formcity,
                area:formarea,
                fullName:formfullName,
                mail:formmail,
                phone:formphone,
                type:authuser['type']
                
            }).then(()=>{
                alert('Post Uploaded Successfully');
                window.location.href="explore.html";
            }).catch((err)=>{
                console.log('error' ,err);
            })
            
        })


            // Loading posts from
            db.collection('posts').get().then(snapshot=>{
                snapshot.forEach(post =>{
                    let postImgSRC;
                    storage.ref('users/'+post.id+'/profile.jpg').getDownloadURL().then(imgurl=>{
                        postImgSRC = imgurl;}).then(()=>{
                            console.log(postImgSRC,post.data())
                            let typerender = post.data()['type'] == 'volunteer' ?
                            `
                            <div class = "type"><p>Volunteer</p></div>
                            `
                            :"";
                            let renderPost = 
                            `
                            <div class="container post" id="${post.id}">
          <div class="post-header">
            <img src="${postImgSRC}" alt="">
            <h3>${post.data()['fullName']}</h3>
            <div>
                ${typerender}
            </div>
          </div>
          <div class="post-body">
            <div>
              <p>${post.data()['txt']}</p>
            </div>
            <div>
              <span>City:</span><b>${post.data()['city']}</b> 
              <span>Area:</span><b>${post.data()['area']}</b>
            </div>
            <button class="btn btn-primary contact">Contact</button>
          </div>
          
          <div class="post-footer">
            
            <div class="contact-info">
              <h5>Contact info:</h5>
              <div>
              <a href="https://api.whatsapp.com/send?phone=2${post.data()['phone']}&text=i%20want%20to%20contact%20you"><img src="images/whatsapp logo.png" alt="whatsapp" style="width: 50px;"><span>${post.data()['phone']}</span></a>
              </div>
              <div>
               <a href="tel:${post.data()['phone']}"> <img src="images/phone-call.PNG" alt="whatsapp" style="width: 40px;"><span>${post.data()['phone']}</span></a>
              </div>
              <div>
                <a href="mailto:${post.data()['mail']}"> <img src="images/mail.png" alt="whatsapp" style="width: 30px;"><span>${post.data()['mail']}</span></a>
              </div>
            </div>
          </div>
        </div>        
                            
                            `

                            document.querySelector('.posts').innerHTML+=renderPost
                            document.querySelectorAll('.contact').forEach(btn =>{
                                btn.addEventListener('click' ,e=>{
                                    e.target.parentElement.nextElementSibling.style.display = 'flex';
                                    console.log('clickkkk')
                                })
                            })
                        


                        })
                })
            })























    }

})

    document.querySelectorAll('.contact').forEach(btn =>{
        btn.addEventListener('click' ,e=>{
            e.target.parentElement.nextElementSibling.style.display = 'flex';
            console.log('clickkkk')
        })
    })

    document.querySelector('#navImg').addEventListener('click',e =>{
        window.location.href="profile.html"
    })
    document.querySelector('#navName').addEventListener('click',e =>{
        window.location.href="profile.html"
    })