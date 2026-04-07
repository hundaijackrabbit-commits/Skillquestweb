import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Target,
  Globe,
  Zap,
  BookOpen,
  Award,
  ArrowRight,
  Heart,
  UserPlus,
  Calendar,
  Compass,
  Lightbulb,
  Coffee,
  Handshake
} from 'lucide-react';

export const metadata = {
  title: 'Professional Community - SkillQuest | Connect & Grow Together',
  description: 'Join a community of ambitious professionals. Share experiences, get career advice, and accelerate your professional development through peer connections.',
};

export default function CommunityPage() {
  // Sample community stats (would be dynamic in production)
  const communityStats = {
    totalMembers: 15420,
    activeDiscussions: 287,
    skillsShared: 1240,
    careerSuccesses: 89
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50/30 to-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4 mr-2" />
            Professional Development Community
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Connect & Grow
            <span className="text-blue-600 block">Together</span>
          </h1>
          
          <p className="text-xl leading-8 text-gray-600 mb-8">
            Join thousands of ambitious professionals sharing experiences, insights, and career advice. 
            Accelerate your growth through meaningful peer connections and collaborative learning.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {communityStats.totalMembers.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {communityStats.activeDiscussions}
              </div>
              <div className="text-sm font-medium text-gray-600">Active Discussions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {communityStats.skillsShared.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600">Skills Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {communityStats.careerSuccesses}
              </div>
              <div className="text-sm font-medium text-gray-600">Career Successes</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" className="px-8">
              <UserPlus className="h-4 w-4 mr-2" />
              Join Community
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <MessageCircle className="h-4 w-4 mr-2" />
              Browse Discussions
            </Button>
          </div>
        </div>

        {/* Community Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded professionals who are serious about career growth and skill development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Expert Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Engage in thoughtful conversations about career strategy, skill development, 
                  and industry trends with experienced professionals.
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Join discussions
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Peer Mentoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with mentors and mentees for mutual growth. Share experiences 
                  and learn from others who've walked similar career paths.
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Find mentors
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Career Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Participate in skill-building challenges and career development 
                  activities designed to accelerate your professional growth.
                </p>
                <div className="flex items-center text-sm text-purple-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  View challenges
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Knowledge Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Share resources, tools, and insights that have helped in your 
                  professional journey. Learn from the community's collective wisdom.
                </p>
                <div className="flex items-center text-sm text-orange-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Share knowledge
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">Virtual Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Attend expert-led webinars, skill workshops, and networking events 
                  designed to advance your career and expand your network.
                </p>
                <div className="flex items-center text-sm text-pink-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  View events
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get inspired by real career transformation stories from community 
                  members who've successfully pivoted, advanced, or achieved their goals.
                </p>
                <div className="flex items-center text-sm text-indigo-600">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Read stories
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Guidelines Preview */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Compass className="h-6 w-6 mr-3 text-blue-600" />
                Community Values
              </h2>
              <p className="text-gray-600">
                Our community is built on mutual respect, professional growth, and collaborative learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Respectful</h3>
                <p className="text-sm text-gray-600">
                  Professional, constructive dialogue that values diverse perspectives
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth-Focused</h3>
                <p className="text-sm text-gray-600">
                  Committed to continuous learning and professional development
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Handshake className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Collaborative</h3>
                <p className="text-sm text-gray-600">
                  Supportive environment where members help each other succeed
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">
                  High-quality discussions and resources for serious professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="text-center py-16 border rounded-2xl bg-white/60">
          <Coffee className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Community Platform Launching Soon
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building a comprehensive community platform for professional development. 
            Be among the first to join when we launch with discussions, mentoring, events, 
            and peer-to-peer learning opportunities.
          </p>
          
          {/* Early Access Signup */}
          <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">
              Get Early Access
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Join our waitlist to be notified when the community platform launches
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your professional email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Join Waitlist
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              We'll notify you when discussions, mentoring, and events are available
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a community of professionals who are serious about career development 
            and skill advancement. Together, we grow faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}