export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          published: boolean | null
          read_time: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          canonical_url: string | null
          challenge: string | null
          client_logo_url: string | null
          client_name: string
          content: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          id: string
          industry: string
          meta_description: string | null
          meta_title: string | null
          project_cost_range: string | null
          project_duration: string | null
          published: boolean | null
          reading_time: number | null
          results: string | null
          results_summary: string | null
          seo_keywords: string | null
          slug: string
          solution: string | null
          tags: string[] | null
          technologies_used: string[] | null
          testimonial: string | null
          testimonial_author: string | null
          testimonial_position: string | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          canonical_url?: string | null
          challenge?: string | null
          client_logo_url?: string | null
          client_name: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          industry: string
          meta_description?: string | null
          meta_title?: string | null
          project_cost_range?: string | null
          project_duration?: string | null
          published?: boolean | null
          reading_time?: number | null
          results?: string | null
          results_summary?: string | null
          seo_keywords?: string | null
          slug: string
          solution?: string | null
          tags?: string[] | null
          technologies_used?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          canonical_url?: string | null
          challenge?: string | null
          client_logo_url?: string | null
          client_name?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          industry?: string
          meta_description?: string | null
          meta_title?: string | null
          project_cost_range?: string | null
          project_duration?: string | null
          published?: boolean | null
          reading_time?: number | null
          results?: string | null
          results_summary?: string | null
          seo_keywords?: string | null
          slug?: string
          solution?: string | null
          tags?: string[] | null
          technologies_used?: string[] | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_position?: string | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          business: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
        }
        Insert: {
          business?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          business?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      doc_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      doc_links: {
        Row: {
          anchor_text: string | null
          created_at: string
          from_doc_id: string | null
          id: string
          to_doc_id: string | null
        }
        Insert: {
          anchor_text?: string | null
          created_at?: string
          from_doc_id?: string | null
          id?: string
          to_doc_id?: string | null
        }
        Update: {
          anchor_text?: string | null
          created_at?: string
          from_doc_id?: string | null
          id?: string
          to_doc_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doc_links_from_doc_id_fkey"
            columns: ["from_doc_id"]
            isOneToOne: false
            referencedRelation: "documentation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_links_to_doc_id_fkey"
            columns: ["to_doc_id"]
            isOneToOne: false
            referencedRelation: "documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      doc_media: {
        Row: {
          created_at: string
          description: string | null
          doc_id: string | null
          id: string
          media_type: string
          media_url: string
          thumbnail_url: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          doc_id?: string | null
          id?: string
          media_type: string
          media_url: string
          thumbnail_url?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          doc_id?: string | null
          id?: string
          media_type?: string
          media_url?: string
          thumbnail_url?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doc_media_doc_id_fkey"
            columns: ["doc_id"]
            isOneToOne: false
            referencedRelation: "documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation: {
        Row: {
          author: string
          canonical_url: string | null
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          parent_id: string | null
          published: boolean | null
          reading_time: number | null
          seo_keywords: string | null
          slug: string
          sort_order: number | null
          tags: string[] | null
          title: string
          updated_at: string
          views_count: number | null
        }
        Insert: {
          author?: string
          canonical_url?: string | null
          category: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          parent_id?: string | null
          published?: boolean | null
          reading_time?: number | null
          seo_keywords?: string | null
          slug: string
          sort_order?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          author?: string
          canonical_url?: string | null
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          parent_id?: string | null
          published?: boolean | null
          reading_time?: number | null
          seo_keywords?: string | null
          slug?: string
          sort_order?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documentation_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          canonical_url: string | null
          category: string
          created_at: string
          description: string | null
          detailed_description: string | null
          difficulty_level: string | null
          documentation_url: string | null
          features: string[] | null
          id: string
          integration_type: string | null
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          pricing_info: string | null
          seo_keywords: string | null
          setup_time: string | null
          slug: string
          sort_order: number | null
          supported_platforms: string[] | null
          updated_at: string
          views_count: number | null
          website_url: string | null
        }
        Insert: {
          canonical_url?: string | null
          category: string
          created_at?: string
          description?: string | null
          detailed_description?: string | null
          difficulty_level?: string | null
          documentation_url?: string | null
          features?: string[] | null
          id?: string
          integration_type?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          pricing_info?: string | null
          seo_keywords?: string | null
          setup_time?: string | null
          slug: string
          sort_order?: number | null
          supported_platforms?: string[] | null
          updated_at?: string
          views_count?: number | null
          website_url?: string | null
        }
        Update: {
          canonical_url?: string | null
          category?: string
          created_at?: string
          description?: string | null
          detailed_description?: string | null
          difficulty_level?: string | null
          documentation_url?: string | null
          features?: string[] | null
          id?: string
          integration_type?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          pricing_info?: string | null
          seo_keywords?: string | null
          setup_time?: string | null
          slug?: string
          sort_order?: number | null
          supported_platforms?: string[] | null
          updated_at?: string
          views_count?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      webhook_endpoints: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          url?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
