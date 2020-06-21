let x=$('#nameInput')
let y=$('#valueInput')
$('#addBtn').onclick=()=>{
    $.post('/profile',{name:x,value:y},async (data)=>{
        console.log(data)
        const{ppes,type}=data
        console.log(ppes)
        console.log(type)
        for(let p of ppes){
            if(type=='hospital'){
                $('#ppe').append(
                    $(`                  
                    <tr>
                        <td>1</td>
                        <td>${p.name}</td>
                        <td>${p.quantity}</td>
                    </tr>         
                    `)
                )
        }else{
            $('#ppe').append(
                $(`                  
                <tr>
                     <td>1</td>
                     <td>${p.name}</td>
                    <td>${p.price}</td>
                </tr>         
                `)
            )
        }
        }
    })
}
