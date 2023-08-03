function Register () {
    return (
        <div className="main_form">
            <form className="register_form">
        
                <label for="player_name">Player's Name: <input type="text" id="player_name" required/></label><br />
                <label for="player_dob">Player's DOB: <input type="date" id="player_dob" required/></label><br />
                <label for="parent_name">Parent Name: <input type="text" id="parent_name" required/></label><br />
                <label for="phone_number">Phone Number: <input type="text" id="phone_number" placeholder="413-555-1234" required/></label><br>
                <label for="sport">Sport: <select name="sport" id="sport"><br />
                    <option value="" disabled selected hidden>Choose One</option>
                    <option value="basketball">Basketball</option>
                    <option value="soccer">Soccer</option>
                </select></label><br />
                <label for="age_group">Age Group: <select name="age_group" id="age_group">
                    <option value="" disabled selected hidden>Choose One</option>
                    <option value="u6">U6</option>
                    <option value="u8">U8</option>
                    <option value="u10">U10</option>
                    <option value="U13">U13</option>
                </select></label><br />
                
                <label for="uniform_pants">Uniform Pant: <select name="uniform_pants" id="uniform_pants">
                    <option value="" disabled selected hidden>Choose One</option>
                    <option value="ys">YouthSmall</option>
                    <option value="ym">YouthMedium</option>
                    <option value="yl">YouthLarge</option>
                    <option value="as">AdultSmall</option>
                    <option value="am">AdultMedium</option>
                    <option value="al">AdultLarge</option>
                </select></label><br />

                <label for="uniform_shirts">Uniform Shirt: <select name="uniform_shirts" id="uniform_shirts">
                    <option value="" disabled selected hidden>Choose One</option>
                    <option value="ys">YouthSmall</option>
                    <option value="ym">YouthMedium</option>
                    <option value="yl">YouthLarge</option>
                    <option value="as">AdultSmall</option>
                    <option value="am">AdultMedium</option>
                    <option value="al">AdultLarge</option>
                </select></label><br />

                <input type="checkbox" id="returningPlayer" name="returningPlayer" value="true" />
                <label for="returnPlayer">Returning Player</label><br />
                <input type="checkbox" id="acknowlegement" name="acknowlegement" value="true" required>
                <label for="acknowlegement">I have read and agreed to the Mass All-Starz rules and regulation.</label><br />
            
        
                <button id="postButton">Register New Player</button>
        
            </form>
        </div>
    )
}

export default Register