/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Facilitators = "facilitators",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type FacilitatorsRecord = {

}

export enum UsersRoleOptions {
	"facilitator" = "facilitator",
	"observer" = "observer",
	"participant" = "participant",
}
export type UsersRecord = {
	name?: string
	avatar?: string
	role: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type FacilitatorsResponse = FacilitatorsRecord & AuthSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	facilitators: FacilitatorsRecord
	users: UsersRecord
}