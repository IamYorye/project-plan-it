import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, AccountOutWithPassword


class AccountAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepo,
    ):
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.email, AccountOut(**account.dict())


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
