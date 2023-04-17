import {
  Mascot,
  Mutation,
  MutationCreateMascotArgs,
} from "@/lib/graphql/types/types.generated";
import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useFirebase } from "@/lib/firebase/FirebaseProvider";
import { useApolloClient } from "@/lib/graphql/ApolloProvider";
import {
  UniversalGetServerSideProps,
  UniversalServerSidePropsInterface,
} from "@/lib/universal-server-props";
import { withUniversalProvider } from "@/lib/with-universal-provider";

interface CreateMascotProps extends UniversalServerSidePropsInterface {}

const CREATE_MASCOT_MUTATION = gql`
  mutation CreateMascot($name: String!) {
    createMascot(name: $name) {
      id
      name
    }
  }
`;

const CreateMascot: NextPage<CreateMascotProps> = ({ firebaseConfig }) => {
  const apolloClient = useApolloClient();
  console.log(firebaseConfig);
  const { user, loading } = useFirebase();

  const [name, setName] = useState("");
  const [createMascot] = useMutation<Mutation, MutationCreateMascotArgs>(
    CREATE_MASCOT_MUTATION
  );

  const [infoAboutMascot, setInfoAboutMascot] = useState<Mascot>();

  const handleCreateMascot = async () => {
    try {
      const { data } = await createMascot({ variables: { name } });
      if (data) {
        setInfoAboutMascot(data.createMascot);
      }
    } catch (error) {
      console.error("Error creating mascot:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-4">Create Mascot</h1>
          <h2 className="text-xl mb-6">
            <Link className="text-blue-500 hover:text-blue-600" href="/">
              Back to home
            </Link>
          </h2>
          <label htmlFor="mascot-name" className="text-lg font-semibold">
            Mascot Name
          </label>
          <input
            id="mascot-name"
            className="block w-full p-2 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
            onClick={handleCreateMascot}
          >
            Create Mascot
          </button>
        </div>
      </div>
      <p>{JSON.stringify(infoAboutMascot)}</p>
    </div>
  );
};

export const getServerSideProps = async () => {
  const universalServerProps = await UniversalGetServerSideProps();
  return {
    props: {
      ...universalServerProps.props,
    },
  };
};

export default withUniversalProvider(CreateMascot);
