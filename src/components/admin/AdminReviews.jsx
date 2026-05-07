import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { CheckCircle, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminReviews() {
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data } = await db.getAllReviews();
      return data || [];
    },
  });

  const toggleApprove = useMutation({
    mutationFn: async ({ id, is_approved }) => {
      await db.approveReview(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });

  const deleteReview = useMutation({
    mutationFn: async (id) => {
      await db.deleteReview(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-reviews'] }),
  });

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading reviews...</div>;

  const approved = reviews.filter(r => r.is_approved);
  const pending = reviews.filter(r => !r.is_approved);

  return (
    <div className="pb-10 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading font-bold text-white text-xl">Reviews ({reviews.length})</h2>
        <div className="flex gap-3 text-sm font-body">
          <span className="text-neon-green">{approved.length} approved</span>
          <span className="text-white/40">·</span>
          <span className="text-neon-pink">{pending.length} pending</span>
        </div>
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-20 text-white/30 font-body">No reviews yet.</div>
      )}

      {pending.length > 0 && (
        <div>
          <p className="text-white/40 text-xs font-heading uppercase tracking-wider mb-3">Pending Approval</p>
          <div className="space-y-3">
            {pending.map(review => (
              <ReviewRow key={review.id} review={review} onToggle={toggleApprove} onDelete={deleteReview} />
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <p className="text-white/40 text-xs font-heading uppercase tracking-wider mb-3">Approved & Live</p>
          <div className="space-y-3">
            {approved.map(review => (
              <ReviewRow key={review.id} review={review} onToggle={toggleApprove} onDelete={deleteReview} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ review, onToggle, onDelete }) {
  return (
    <div className={`bg-white/[0.03] border rounded-2xl p-4 flex gap-4 items-start ${review.is_approved ? 'border-neon-green/20' : 'border-white/8'}`}>
      <span className="text-2xl shrink-0">{'⭐'.repeat(review.rating || 5)}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-sm font-body leading-relaxed mb-1">&quot;{review.comment}&quot;</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-heading font-semibold text-xs text-neon-pink">{review.name}</span>
          <span className="text-white/20 text-xs">{new Date(review.created_at).toLocaleDateString()}</span>
          {review.is_approved && <span className="text-neon-green text-xs font-heading">✓ Live</span>}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onToggle.mutate({ id: review.id, is_approved: !review.is_approved })}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
          title={review.is_approved ? 'Unapprove' : 'Approve'}
        >
          {review.is_approved
            ? <EyeOff className="w-4 h-4 text-white/30" />
            : <CheckCircle className="w-4 h-4 text-neon-green" />}
        </button>
        <button
          onClick={() => { if (confirm('Delete this review?')) onDelete.mutate(review.id); }}
          className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
}
