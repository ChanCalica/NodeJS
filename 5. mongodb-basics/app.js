const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://chandev2025:chandev2025@cluster0.sgxgx.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error ->', err));

const userSchema = new mongoose.Schema({
  // _id: Number, //for subdocuments, { _id: false } <-- disable `_id`
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function CreateUser() {
  try {
    const user = await User.create({
      //   _id: 1,
      name: 'chandev deleted',
      email: 'chandev3@example.com',
      age: 22,
      isActive: false,
      tags: ['chandev2', 'developer'],
    });

    // const user = new User({
    //   name: 'chandev updated',
    //   email: 'chandev@example.com',
    //   age: 22,
    //   isActive: true,
    //   tags: ['chandev', 'developer'],
    // });
    // await user.save();

    console.log('User created ->', user);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function GetAllUsers() {
  try {
    const users = await User.find({})
      .select('name email -_id')
      .limit(2)
      .skip(2);

    console.log('Users ->', users);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function GetUserById() {
  try {
    const user = await User.findById('67a8890739f5beca06ae83d3');

    console.log('User ->', user);
  } catch (error) {
    console.error('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function GetAllUserActiveIsFalse() {
  try {
    const userActiveIsFalse = await User.find({ isActive: false }).exec();

    console.log('User Active ->', userActiveIsFalse);
  } catch (error) {
    console.error('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function FirstUser() {
  try {
    const firstUser = await User.findOne({ age: 22 }).exec();

    console.log('First User ->', firstUser);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function Pagination() {
  try {
    const limit = 10;
    const page = 1;

    const startIndex = (page - 1) * limit;

    const totalCount = await User.countDocuments({ isActive: true });

    const items = await User.find()
      .sort({ name: -1 })
      .skip(startIndex)
      .limit(limit);

    console.log('Items ->', items, 'Total Count ->', totalCount);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    await mongoose.connection.close();
  }
}

async function DeleteUser() {
  try {
    // const deleteUser = await User.deleteOne({ name: 'chandev2' });
    // console.log('Delete User ->', deleteUser.deletedCount);
    const deleteUser = await User.findByIdAndDelete('67a898afdda83cf0d4739fdf');
    console.log('Delete User ->', deleteUser);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    mongoose.connection.close();
  }
}

async function UpdateUser() {
  try {
    const id = '67a872438790bfe143e3ec5c';
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { name: 'christianDev2025!4' },
        $push: { tags: 'updated 2025' },
      },
      { new: true }
    );

    console.log('Update User ->', updateUser);
  } catch (error) {
    console.log('Error ->', error);
  } finally {
    mongoose.connection.close();
  }
}

// CreateUser();
// GetAllUsers();
// GetUserById();
// GetAllUserActiveIsFalse();
// FirstUser();
// Pagination();
// DeleteUser();
UpdateUser();
