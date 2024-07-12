export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      release_downloads: {
        Row: {
          edit: string;
          format: Database['public']['Enums']['audio-filetype'];
          id: number;
          release_id: number;
          url: string;
        };
        Insert: {
          edit: string;
          format: Database['public']['Enums']['audio-filetype'];
          id?: number;
          release_id: number;
          url: string;
        };
        Update: {
          edit?: string;
          format?: Database['public']['Enums']['audio-filetype'];
          id?: number;
          release_id?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_release_downloads_new_release_id_fkey';
            columns: ['release_id'];
            isOneToOne: false;
            referencedRelation: 'releases';
            referencedColumns: ['id'];
          },
        ];
      };
      release_links: {
        Row: {
          id: number;
          release_id: number;
          url: string;
        };
        Insert: {
          id?: number;
          release_id: number;
          url: string;
        };
        Update: {
          id?: number;
          release_id?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_release_links_new_release_id_fkey';
            columns: ['release_id'];
            isOneToOne: false;
            referencedRelation: 'releases';
            referencedColumns: ['id'];
          },
        ];
      };
      releases: {
        Row: {
          art_url: string;
          artists: string[];
          description: string | null;
          genre: string;
          id: number;
          key: string | null;
          label: string | null;
          permalink: string;
          release_date: string;
          tempo: number | null;
          title: string;
          type: string;
        };
        Insert: {
          art_url?: string;
          artists: string[];
          description?: string | null;
          genre: string;
          id?: number;
          key?: string | null;
          label?: string | null;
          permalink: string;
          release_date: string;
          tempo?: number | null;
          title: string;
          type: string;
        };
        Update: {
          art_url?: string;
          artists?: string[];
          description?: string | null;
          genre?: string;
          id?: number;
          key?: string | null;
          label?: string | null;
          permalink?: string;
          release_date?: string;
          tempo?: number | null;
          title?: string;
          type?: string;
        };
        Relationships: [];
      };
      social_links: {
        Row: {
          href: string;
          id: number;
          platform: string;
        };
        Insert: {
          href: string;
          id?: number;
          platform: string;
        };
        Update: {
          href?: string;
          id?: number;
          platform?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
      };
      get_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: Json;
      };
      get_claims: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_my_claim: {
        Args: {
          claim: string;
        };
        Returns: Json;
      };
      get_my_claims: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      is_claims_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_claim: {
        Args: {
          uid: string;
          claim: string;
          value: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      'audio-filetype': 'mp3' | 'wav';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
