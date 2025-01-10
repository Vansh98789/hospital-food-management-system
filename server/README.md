<h1>backend functionality req=></h1>
<p>Implement authentication (JWT or OAuth).</p>
<p>CRUD operations for managing patient details.</p>
<p>CRUD operations for managing food/diet charts.</p>
<p>Assigning tasks to the inner pantry.</p>
<p>Marking deliveries as complete.</p>


<h1>implimentation=></h1>

<h2>Authentication-</h2>
<p>=>Login (JWT Authentication)  :POST /auth/login</p>

<h2>Patient Management-</h2>
<p>=>Create a Patient  :POST /api/patients</p>
<p>=>Get All Patients  :GET /api/patients</p>
<p>=>Get Patient by ID  :GET /api/patients/:id</p>
<p>=>Update Patient Details  :PUT /api/patients/:id</p>
<p>=>Delete Patient  :DELETE /api/patients/:id</p>

<h2>Diet Chart Management-</h2>
<p>=>Create Diet Chart  :POST /api/diet-charts</p>
<p>=>Get Diet Chart by Patient ID  :GET /api/diet-charts/:patient_id</p>
<p>=>Update Diet Chart  :PUT /api/diet-charts/:id</p>
<p>=>Delete Diet Chart  :DELETE /api/diet-charts/:id</p>

<h2>Pantry Staff Management-</h2>
<p>=>Create Pantry Staff  :POST /api/pantry-staff</p>
<p>=>Get All Pantry Staff  :GET /api/pantry-staff</p>
<p>=>Update Pantry Staff  :PUT /api/pantry-staff/:id</p>
<p>=>Delete Pantry Staff  :DELETE /api/pantry-staff/:id</p>

<h2>Meal Delivery Task Management-</h2>
<p>=> Create Meal Task  :POST /api/tasks</p>
<p>=> Get All Tasks  :GET /api/tasks</p>
<p>=>Get Task by ID  :GET /api/tasks/:id</p>
<p>=>Update Task Status( Mark as Delivered)  :PUT /api/tasks/:id</p>



