// our-domain.com/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const newMeetupPage = () => {
  const addMeetupHandler = async enteredMeetupData => {
    const response = fetch('https://some-domain.com/abc');
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default newMeetupPage;
