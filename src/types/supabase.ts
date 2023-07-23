export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat: {
        Row: {
          created_at: string
          id: number
          topic: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          topic?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "chat-topic": {
        Row: {
          content: string
          created_at: string
          id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      chat2: {
        Row: {
          created_at: string
          id: number
          topic: string
        }
        Insert: {
          created_at?: string
          id?: number
          topic: string
        }
        Update: {
          created_at?: string
          id?: number
          topic?: string
        }
        Relationships: []
      }
      message: {
        Row: {
          chat_id: number
          content: string
          created_at: string | null
          id: number
          sender_id: string
        }
        Insert: {
          chat_id: number
          content: string
          created_at?: string | null
          id?: number
          sender_id: string
        }
        Update: {
          chat_id?: number
          content?: string
          created_at?: string | null
          id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_chat_id_fkey"
            columns: ["chat_id"]
            referencedRelation: "chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      talk: {
        Row: {
          created_at: string
          duration: number
          id: number
          topic: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration: number
          id?: number
          topic: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration?: number
          id?: number
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talk_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          avatar_img: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          avatar_img?: string | null
          created_at?: string | null
          id: string
        }
        Update: {
          avatar_img?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
