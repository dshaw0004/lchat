export type resType = {
	user: {
		id: string;
		aud: string;
		role: string;
		email: string;
		email_confirmed_at: string;
		phone: string | undefined;
		confirmation_sent_at: string;

		confirmed_at: string;

		last_sign_in_at: string

		app_metadata: { provider: string; providers: [string] };

		identities: [
			{
				id: string

				user_id: string

				identity_data: {
					email: string
					sub:string
				};

				provider: string

				last_sign_in_at: string

				created_at: string
				updated_at: string
			}
		];

		created_at: string
        updated_at: string
        [key:string]: any
    };
    session: {

  access_token: string
    token_type:string

    expires_in: BigInteger,

    refresh_token: string

  user: {

      id:string
      aud: string
      role: string
      email:string
      email_confirmed_at: string

      phone: string | undefined

      confirmation_sent_at:string

      confirmed_at: string

      last_sign_in_at: string

      app_metadata: { provider: string, providers: [ string ] },

      user_metadata: {},

    identities: [

      {

          id:string

          user_id: string
          identity_data: { email: string, sub: string },

          provider:string

          last_sign_in_at: string

          created_at: string

          updated_at:string
        }

      ],

      created_at: string
      updated_at:string

    },

    expires_at: BigInteger

  }
};
