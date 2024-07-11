export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'admin_users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      attendees: {
        Row: {
          activated_at: string | null
          avatar_url: string
          created_at: string
          display_name: string | null
          email: string
          id: string
          image_file_name: string
          provider: string
          receipt_id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          avatar_url: string
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          image_file_name?: string
          provider: string
          receipt_id: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          avatar_url?: string
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          image_file_name?: string
          provider?: string
          receipt_id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'attendees_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      speakers: {
        Row: {
          caption_en: string | null
          caption_ja: string | null
          created_at: string
          description_en: string
          description_ja: string
          detail_page_id: string | null
          display_order: number | null
          github_id: string | null
          id: string
          image_url: string | null
          is_open: boolean
          name_en: string
          name_ja: string
          session_comment_en: string | null
          session_comment_ja: string | null
          session_description_en: string | null
          session_description_ja: string | null
          session_doc_title_en: string | null
          session_doc_title_ja: string | null
          session_doc_url: string | null
          session_place: string | null
          session_time_duration: number | null
          session_time_from: string | null
          session_title_en: string | null
          session_title_ja: string | null
          session_type: string | null
          updated_at: string
          x_id: string | null
        }
        Insert: {
          caption_en?: string | null
          caption_ja?: string | null
          created_at?: string
          description_en: string
          description_ja: string
          detail_page_id?: string | null
          display_order?: number | null
          github_id?: string | null
          id?: string
          image_url?: string | null
          is_open: boolean
          name_en: string
          name_ja: string
          session_comment_en?: string | null
          session_comment_ja?: string | null
          session_description_en?: string | null
          session_description_ja?: string | null
          session_doc_title_en?: string | null
          session_doc_title_ja?: string | null
          session_doc_url?: string | null
          session_place?: string | null
          session_time_duration?: number | null
          session_time_from?: string | null
          session_title_en?: string | null
          session_title_ja?: string | null
          session_type?: string | null
          updated_at?: string
          x_id?: string | null
        }
        Update: {
          caption_en?: string | null
          caption_ja?: string | null
          created_at?: string
          description_en?: string
          description_ja?: string
          detail_page_id?: string | null
          display_order?: number | null
          github_id?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean
          name_en?: string
          name_ja?: string
          session_comment_en?: string | null
          session_comment_ja?: string | null
          session_description_en?: string | null
          session_description_ja?: string | null
          session_doc_title_en?: string | null
          session_doc_title_ja?: string | null
          session_doc_url?: string | null
          session_place?: string | null
          session_time_duration?: number | null
          session_time_from?: string | null
          session_title_en?: string | null
          session_title_ja?: string | null
          session_type?: string | null
          updated_at?: string
          x_id?: string | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string
          description_en: string
          description_ja: string
          detail_page_id: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_open: boolean
          link_url: string | null
          name: string
          speaker_id: string | null
          tag: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en: string
          description_ja: string
          detail_page_id?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_open: boolean
          link_url?: string | null
          name: string
          speaker_id?: string | null
          tag?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_ja?: string
          detail_page_id?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_open?: boolean
          link_url?: string | null
          name?: string
          speaker_id?: string | null
          tag?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      staffs: {
        Row: {
          created_at: string
          display_order: number | null
          github_id: string | null
          id: string
          image_url: string | null
          is_open: boolean
          name: string
          updated_at: string
          x_id: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          github_id?: string | null
          id?: string
          image_url?: string | null
          is_open: boolean
          name: string
          updated_at?: string
          x_id?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          github_id?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean
          name?: string
          updated_at?: string
          x_id?: string | null
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
