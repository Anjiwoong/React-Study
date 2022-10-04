import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://w.namu.la/s/d023bc0fe2f84bbf21fed6ca6dad5737d5193d7a97e9be1963614265c079ab544a5e22b7474b4d610cd26ab39f24e35f32e3972bb7ecbcdcce0dff68601e32cc193d073c54ebacb0d8c28b9edc44704f3c7513127b0e7b53f4a736eb2d56e8a0"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
};

export const getStaticProps = async context => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          'https://w.namu.la/s/d023bc0fe2f84bbf21fed6ca6dad5737d5193d7a97e9be1963614265c079ab544a5e22b7474b4d610cd26ab39f24e35f32e3972bb7ecbcdcce0dff68601e32cc193d073c54ebacb0d8c28b9edc44704f3c7513127b0e7b53f4a736eb2d56e8a0',
        id: meetupId,
        title: 'First Meetup',
        address: 'Some Street 5, Some City',
        description: 'This is a first meetup',
      },
    },
  };
};

export default MeetupDetails;
